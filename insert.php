<?php

$data = array();

$emailAddress = $_POST['emailAddress'];
$answers = json_encode($_POST['formValues']);

function rempty($var)
{
    return !($var == "" || $var == null);
}

try {
    $conn = new PDO('mysql:host=localhost;dbname=badiwork_birevim;charset=utf8;port=3306', 'badiwork_birevim', 'Ok?2021?.');
    $query = $conn->prepare("INSERT INTO survey SET emailAddress=?,answers=?");

    $insert = $query->execute(array($emailAddress,$answers));

    if ($insert) {
        $last_id = $conn->lastInsertId();
        $data['status'] = 'ok';
        $data['result'] = $last_id;
        echo json_encode($data);
    } else {
        $data['status'] = 'err';
        $data['result'] = 'Kaydetme Başarısız!';
        echo json_encode($data);
    }
} catch (PDOexception $exe) {

    $data['status'] = 'err';
    $data['result'] = $exe->getMessage();
    echo json_encode($data);
}
