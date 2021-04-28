<?php
$username = $_GET['username'];
var_dump($username);
if ($username){
  echo  $username;
}else{
   echo "提交失败";
}
