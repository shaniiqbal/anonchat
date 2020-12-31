var currentUser,displayName,email,photoUrl,emailVerified,uid;

var resetDB = function(){
/*    DeleteUsersResult result = await FirebaseAuth.DefaultInstance.DeleteUsersAsync();
    
    Console.WriteLine($"Successfully deleted {result.SuccessCount} users.");*/
}
var showdata = function(){
	var displayName;
	firebase.auth().onAuthStateChanged((user) => {
		if (user != null) {

			//displayName = user.displayName;
			email = user.email;
			uid = user.uid;  
			 currentUser = user.uid;
			 var avatarText = "";
		  	var me = {};
			var you = {};
			me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";
			you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";
			
			var allAvatar = [];
			var allchat = firebase.firestore().collection("chat").orderBy("createdAt");
			allchat.onSnapshot(function(response) {
				document.getElementById("mCSB_1_container").innerHTML = "";
				response.docs.forEach(function(chat){
					firebase.firestore().collection("users").doc(chat.data().userid).get()
					.then(function(userdata) {
							if(allAvatar.includes(chat.data().userid)){
								allAvatar.push(chat.data().userid);
							}
							if(userdata.data()){
								displayName = userdata.data().nickname;
							
								//console.log("Document successfully written!", userdata.data().createdAt);
								if(displayName){
									avatararray = displayName.split(" ");	
								}	
								if(avatararray){
									let counter = 0;
									avatararray.forEach(function(item){
										
										avatarText = item.charAt(0);
										counter++;
									});
								}else{
									avatarText = displayName.charAt(0);
								}
							}else{
								avatarText = "AB";
							}
							
							
						
						/*	var date = new Date(chat.data().createdAt * 1000);
							var hours = date.getHours();
							var minutes = "0" + date.getMinutes();
							var seconds = "0" + date.getSeconds();
							if(	currentUser == chat.data().userid){
								document.getElementById("mCSB_1_container").innerHTML += '<div class="message new">'
								+'<figure class="avatar"><i>'+avatarText+'</i></figure>'+
								chat.data().message
								+'<div class="timestamp">'+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)+'</div>'
								+'</div>';
							}else{
								document.getElementById("mCSB_1_container").innerHTML += '<div class="message message-personal new">'
								+'<figure class="avatar"><i>'+avatarText+'</i></figure>'+
								chat.data().message
								+'<div class="timestamp">'+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)+'</div>'
								+'</div>';
							}		*/
						
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
					});
					
					var date = new Date(chat.data().createdAt * 1000);
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					var seconds = "0" + date.getSeconds();
					if(	currentUser == chat.data().userid){
						document.getElementById("mCSB_1_container").innerHTML += '<div class="message new">'
						+'<figure class="avatar"><i>'+avatarText+'</i></figure>'+
						chat.data().message
						+'<div class="timestamp">'+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)+'</div>'
						+'</div>';
					}else{
						document.getElementById("mCSB_1_container").innerHTML += '<div class="message message-personal new">'
						+'<figure class="avatar"><i>'+avatarText+'</i></figure>'+
						chat.data().message
						+'<div class="timestamp">'+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)+'</div>'
						+'</div>';
					}					
				})
				
				setTimeout(function(){
					$('html,body').scrollTop( $('html,body').height() );
					var d = $('.messages .messages-content');
					console.log(d.prop('scrollHeight'));
					$('.messages .messages-content').animate({ scrollTop: d.prop('scrollHeight') }, 1000);
					console.log("work");
				},1000);
				
			});

		  
		} else{
			window.location = "login.html";
		}
	  });	
};
var insertchat = function(){
	var message = document.getElementById("message").value;
	if(!message){
		alert("message is required");
		return;
	}
	//console.log(message);
	firebase.firestore().collection("chat").add({
    message: message,
	userid:currentUser,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()  
	})
	.then(function(docRef) {
		console.log("Document successfully written!",docRef);
		document.getElementById("message").value = "";
	})
	.catch(function(error) {
		console.error("Error writing document: ", error);
	});
		
}


var logout = function(){
	firebase.auth().signOut().then(function() {
		window.location = "./login.html";
	  }).catch(function(error) {
		// An error happened.
	  });
}