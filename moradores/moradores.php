<?php
include "conexao.php";

$sql = "SELECT id_morador, nome, telefone, email, status FROM moradores ORDER BY nome ASC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <title>Lista de Moradores</title>
  <style>
    body {font-family: Arial, sans-serif; background: #f9f9f9; color: #333;}
    h2 {text-align: center; margin: 20px 0;}
    table {width: 90%; margin: auto; border-collapse: collapse;}
    th, td {border: 1px solid #ccc; padding: 10px; text-align: center;}
    th {background: #222; color: white;}
    tr:nth-child(even) {background: #f2f2f2;}
    a {display: block; text-align: center; margin: 20px; text-decoration: none; color: #007BFF;}
    a:hover {text-decoration: underline;}
  </style>
</head>
<body>

<h2>Moradores Cadastrados</h2>
<table>
  <tr>
    <th>ID</th>
    <th>Nome</th>
    <th>Telefone</th>
    <th>Email</th>
    <th>Status</th>
  </tr>
  <?php while($row = $result->fetch_assoc()) { ?>
    <tr>
      <td><?php echo $row["id_morador"]; ?></td>
      <td><?php echo $row["nome"]; ?></td>
      <td><?php echo $row["telefone"]; ?></td>
      <td><?php echo $row["email"]; ?></td>
      <td><?php echo $row["status"]; ?></td>
    </tr>
  <?php } ?>
</table>

<a href="index.php">⬅ Voltar ao Início</a>

</body>
</html>
