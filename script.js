function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("user Not Found");
    return raw.json();
  });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
    if (!raw.ok) throw new Error("Failed To Fetch Repos");
    return raw.json();
  });
}

function DecorateProfile(profile) {
  let card = `
         <div class="flex items-center space-x-4">
        <img id="avatar" src="${profile.avatar_url}" class="w-16 h-16 rounded-full border" />
        <div>
          <h2 id="name" class="text-lg font-semibold">${profile.name || "N/A"}</h2>
          <p id="usernameDisplay" class="text-sm text-gray-500">@${profile.login}</p>
        </div>
      </div>

      <p id="bio" class="text-gray-700 text-sm">${profile.bio || "No bio available."}</p>

      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="font-semibold" id="repos">${profile.public_repos}</p>
          <p class="text-sm text-gray-500">Repos</p>
        </div>
        <div>
          <p class="font-semibold" id="followers">${profile.followers}</p>
          <p class="text-sm text-gray-500">Followers</p>
        </div>
        <div>
          <p class="font-semibold" id="following">${profile.following}</p>
          <p class="text-sm text-gray-500">Following</p>
        </div>
      </div>

      <!-- New Additional Fields -->
      <div class="space-y-1 text-sm text-gray-600">
        <p><strong>Company:</strong> <span id="company">${profile.company || "N/A"}</span></p>
        <p><strong>Location:</strong> <span id="location">${profile.location || "N/A"}</span></p>
        <p><strong>Blog:</strong> 
          <a href="${profile.blog || '#'}" id="blog" class="text-blue-600 hover:underline" target="_blank">
            ${profile.blog || "N/A"}
          </a>
        </p>
        <p><strong>Twitter:</strong> 
          <a href="https://twitter.com/${profile.twitter_username || ''}" id="twitter" class="text-blue-600 hover:underline" target="_blank">
            ${profile.twitter_username ? '@' + profile.twitter_username : 'N/A'}
          </a>
        </p>
        </div>`;

  // Inject the HTML into your container (e.g. replace current profile)
  document.getElementById("profile").innerHTML = card;
}

// getProfile("asyn4444c").then((data) => {
// console.log(data);

// });
// getRepos("async").then((data) => {  
//   console.log(data);
// });

var search = document.querySelector("#searchBtn");
var input = document.querySelector("#username");
search.addEventListener("click", function () {
  let userinput= input.value.trim();
  if(userinput.length>0){

    getProfile(userinput)
    .then((data) => {
      DecorateProfile(data);

        
    })
  }
  else{
    alert("Please Enter a Valid Username");
  }

});