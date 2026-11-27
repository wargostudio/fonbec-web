<?php
/**
 * FONBEC — receptor de formularios (Hostinger / cualquier hosting con PHP).
 * Valida en el servidor, filtra spam (honeypot + tiempo + límite por IP) y envía por correo.
 * Si el hosting no tiene PHP, el sitio ofrece automáticamente enviar el mensaje por correo.
 */
declare(strict_types=1);

const DESTINO   = 'info@fonbec.org.ar';          // ← casilla que recibe los mensajes
const REMITENTE = 'web@fonbec.org.ar';           // ← casilla del dominio (evita que caiga en spam)
const MOTIVOS   = [
  'apadrinar'    => 'Quiero ser padrino o madrina',
  'voluntariado' => 'Quiero ser voluntario/a',
  'donar'        => 'Quiero donar (Amigo de FONBEC)',
  'empresa'      => 'Represento a una empresa',
  'becario'      => 'Quiero ser becario/a',
  'historia'     => 'Quiero compartir mi historia',
  'consulta'     => 'Otra consulta',
];

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function responder(int $code, array $data): void { http_response_code($code); echo json_encode($data, JSON_UNESCAPED_UNICODE); exit; }
function limpio(string $k, int $max = 200): string {
  $v = trim((string)($_POST[$k] ?? ''));
  $v = str_replace(["\r", "\0"], '', $v);
  return mb_substr($v, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') responder(405, ['ok' => false, 'error' => 'Método no permitido']);

// Honeypot
if (!empty($_POST['web'])) responder(200, ['ok' => true]);

// Límite simple: 5 envíos cada 10 minutos por IP
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
$lock = sys_get_temp_dir() . '/fonbec_' . md5($ip);
$hits = array_filter(array_map('intval', @file($lock, FILE_IGNORE_NEW_LINES) ?: []), fn($t) => $t > time() - 600);
if (count($hits) >= 5) responder(429, ['ok' => false, 'error' => 'Demasiados envíos. Probá en unos minutos.']);
$hits[] = time();
@file_put_contents($lock, implode("\n", $hits));

$motivo   = limpio('motivo', 20);
$nombre   = limpio('nombre', 80);
$apellido = limpio('apellido', 80);
$email    = limpio('email', 160);
$telefono = limpio('telefono', 40);
$ciudad   = limpio('ciudad', 80);
$empresa  = limpio('empresa', 120);
$como     = limpio('como_conocio', 200);
$mensaje  = limpio('mensaje', 4000);
$acepto   = !empty($_POST['acepto']);

$errores = [];
if (!isset(MOTIVOS[$motivo])) $motivo = 'consulta';
if (mb_strlen($nombre) < 2)   $errores[] = 'nombre';
if (mb_strlen($apellido) < 2) $errores[] = 'apellido';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'email';
if ($telefono !== '' && !preg_match('/^[0-9+()\-\s]{6,}$/', $telefono)) $errores[] = 'telefono';
if (mb_strlen($mensaje) < 10) $errores[] = 'mensaje';
if (!$acepto) $errores[] = 'acepto';
if ($errores) responder(422, ['ok' => false, 'error' => 'Datos inválidos', 'campos' => $errores]);

$asunto = 'Web FONBEC — ' . MOTIVOS[$motivo] . ' — ' . $nombre . ' ' . $apellido;
$cuerpo = implode("\n", [
  'Motivo: ' . MOTIVOS[$motivo],
  'Nombre: ' . $nombre . ' ' . $apellido,
  'Email: ' . $email,
  'Teléfono: ' . ($telefono ?: '-'),
  'Ciudad: ' . ($ciudad ?: '-'),
  'Empresa: ' . ($empresa ?: '-'),
  '¿Cómo conoció FONBEC?: ' . ($como ?: '-'),
  '',
  'Mensaje:',
  $mensaje,
  '',
  '— Enviado desde el formulario de www.fonbec.org.ar el ' . date('d/m/Y H:i'),
]);
$headers = [
  'From: FONBEC Web <' . REMITENTE . '>',
  'Reply-To: ' . $nombre . ' ' . $apellido . ' <' . $email . '>',
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
];
$ok = @mail(DESTINO, '=?UTF-8?B?' . base64_encode($asunto) . '?=', $cuerpo, implode("\r\n", $headers));
if (!$ok) responder(500, ['ok' => false, 'error' => 'No se pudo enviar el correo']);
responder(200, ['ok' => true]);
