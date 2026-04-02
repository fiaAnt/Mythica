const users = [

  { id: 1, name: "Алексей", age: 25 },

  { id: 2, name: "Мария", age: 17 },

  { id: 3, name: "Иван", age: 30 }

];



function processUsers(data) {

  console.log("Начинаем обработку пользователей...");

  for (let i = 0; i < data.length; i++ {

    const user = data[i];



    if (user.age >= 18) {

      console.log(user.name + " совершеннолетний.");

    } else {



      user.notif.toUpperCase(); 

      console.log(user.name + " еще учится.");

    }

  }





  console.log("Последний обработанный юзер: " + user.name);

}



processUsers(users);
