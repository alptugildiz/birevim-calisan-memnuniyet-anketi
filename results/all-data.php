<?php

$data = array();
$temp = array();

try {

    $conn = new PDO('mysql:host=localhost;dbname=badiwork_birevim;charset=utf8;port=3306', 'badiwork_birevim', 'Ok?2021?.');

    $query1 = $conn->query("SELECT * FROM survey group by emailAddress order by Id desc;", PDO::FETCH_ASSOC);
    $result1 = $query1->fetchAll();

   

    $data['status'] = 'ok';
    $data['data1'] = $result1;
    

    echo json_encode($data);
} catch (PDOexception $exe) {

    $data['status'] = 'err';
    $data['result'] = $exe->getMessage();
    echo json_encode($data);
}
