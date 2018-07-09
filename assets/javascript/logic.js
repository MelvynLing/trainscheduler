
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA70EzUXnYVQk91G0w9cWu1u_eye9eVLJQ",
    authDomain: "practiseproject-90c9e.firebaseapp.com",
    databaseURL: "https://practiseproject-90c9e.firebaseio.com",
    projectId: "practiseproject-90c9e",
    storageBucket: "practiseproject-90c9e.appspot.com",
    messagingSenderId: "512909133237"
  };
  firebase.initializeApp(config);


  var trainData = firebase.database();

  $('#addTrainBtn').on("click",function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }

      trainData.ref().push(newTrain);

      alert("Train Added!");

      $("#trainInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

      return false;
  })

  trainData.ref().on("child_added",function(snapshot){
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency = snapshot.val().frequency;
      var firstTrain = snapshot.val().firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"m").format("hh:mm A");
//debugging
      console.log(remainder);
      console.log(minutes);
      console.log(arrival);

$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  })
