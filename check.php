<?php

$securityCode = $_POST['securityCode'];
$data = array();

try {

    $conn = new PDO('mysql:host=localhost;dbname=badiwork_birevim;charset=utf8;port=3306', 'badiwork_birevim', 'Ok?2021?.');

    $query = $conn->prepare("SELECT u1.emailAddress,u1.securityCode,s1.answers FROM `users` u1 left join survey s1 on u1.emailAddress=s1.emailAddress where u1.securityCode=?");
    $query->execute(array($securityCode));

    if ($query->rowCount()) {

        foreach ($query as $row) {

            $data['status'] = 'ok';
            $data['result'] = $row;

            echo json_encode($data);
        }
    } else {

        $data['status'] = 'err';
        $data['result'] = 'Hatalı Kod!';
        echo json_encode($data);
    }
} catch (PDOexception $exe) {

    $data['status'] = 'err';
    $data['result'] = 'Bağlantı hatası!';
    echo json_encode($data);
}
