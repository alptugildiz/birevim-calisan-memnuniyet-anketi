<?php

$data = array();

$ratingScore = $_POST['rating_input_1'][0] . '-' . $_POST['rating_input_2'][0] . '-' . $_POST['rating_input_3'][0];

function rempty($var)
{
    return !($var == "" || $var == null);
}

try {
    $conn = new PDO('mysql:host=localhost;dbname=badiworks_pfizerAnket;charset=utf8;port=3306', 'badiworks_pfizerAnket', 'Ok?2021?.');
    $query = $conn->prepare("INSERT INTO survey SET
    /*Step 1/2*/ q1= ?,q2= ?,q3= ?,q4= ?,q5= ?,
    /*Step 2/2*/ q6= ?,q6_1= ?,q7= ?,

    /*Step 1/8*/ q8= ?,q9= ?,
    /*Step 2/8*/ q10= ?,q11= ?,
    /*Step 3/8*/ q12= ?,q13= ?,
    /*Step 4/8*/ q14= ?,q15= ?,
    /*Step 5/8*/ q16= ?,q16_1= ?,
    /*Step 6/8*/ q17= ?,q18= ?,
    /*Step 7/8*/ q19= ?,q20= ?,
    /*Step 8/8*/ q21= ?,
    
    /*Step 1/10*/q22= ?,q22_1= ?,
    /*Step 2/10*/q23= ?,q23_1= ?,
    /*Step 3/10*/q24= ?,
    /*Step 4/10*/q25= ?,q26= ?,q26_1= ?,
    /*Step 5/10*/q27= ?,q27_1= ?,q27_2= ?,
    /*Step 6/10*/q28= ?,
    /*Step 7/10*/q29= ?,q29_1= ?,q29_2= ?,
    /*Step 8/10*/q30= ?,
    /*Step 9/10*/q31= ?,q32= ?,
    /*Step 10/10*/q33= ?,q34= ?,
    /*Step Rating*/q35= ?
    ");

    $insert = $query->execute(array(
        /*Step 1/2*/ $_POST['question_1'][0], $_POST['university'][0], $_POST['department'][0], $_POST['question_2'][0], $_POST['gender'][0],
        /*Step 2/2*/ implode("-", array_filter($_POST['question_3'], 'rempty')), $_POST['step46input'][0], $_POST['question_4'][0],

        /*Step 1/8*/ $_POST['question_5'][0], $_POST['question_6'][0],
        /*Step 2/8*/ $_POST['question_7'][0], $_POST['question_8'][0],
        /*Step 3/8*/ $_POST['textarea515'][0], $_POST['textarea1215_2'][0],
        /*Step 4/8*/ $_POST['textarea1215_3'][0], $_POST['textarea1215_4'][0],
        /*Step 5/8*/ implode("-", array_filter($_POST['question_social'], 'rempty')), $_POST['step915input'][0],
        /*Step 6/8*/ $_POST['question_9'][0], $_POST['question_10'][0],
        /*Step 7/8*/ $_POST['question_11'][0], $_POST['question_12'][0],
        /*Step 8/8*/ $_POST['sortableQuestion'][0],

        /*Step 1/10*/ implode("-", array_filter($_POST['question_13'], 'rempty')), $_POST['step113input'][0],
        /*Step 2/10*/ $_POST['question_14'][0], $_POST['step213input'][0],
        /*Step 3/10*/ implode("-", array_filter($_POST['question_15'], 'rempty')),
        /*Step 4/10*/ $_POST['question_16'][0], $_POST['question_20'][0], $_POST['step613input'][0],
        /*Step 5/10*/ $_POST['question_17'][0], $_POST['question_18'][0], $_POST['question_19'][0],
        /*Step 6/10*/ implode("-", array_filter($_POST['question_21'], 'rempty')),
        /*Step 7/10*/ $_POST['question_22'][0], implode("-", array_filter($_POST['question_24'], 'rempty')), implode("-", array_filter($_POST['question_25'], 'rempty')),
        /*Step 8/10*/ implode("-", array_filter($_POST['question_26'], 'rempty')),
        /*Step 9/10*/ $_POST['textarea1013_1'][0], $_POST['textarea1013_2'][0],
        /*Step 10/10*/ $_POST['textarea1013_3'][0], $_POST['textarea1013_4'][0],
        /*Step Rating*/ $ratingScore
    ));

    if ($insert) {
        $last_id = $conn->lastInsertId();
        $data['status'] = 'ok';
        $data['result'] = $last_id;
        echo json_encode($data);
    } else {
        $data['status'] = 'err';
        $data['result'] = 'Başvuru Başarısız!';
        echo json_encode($data);
    }
} catch (PDOexception $exe) {

    $data['status'] = 'err';
    $data['result'] = $exe->getMessage();
    echo json_encode($data);
}
