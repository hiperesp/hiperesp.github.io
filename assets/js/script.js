function addRepo(title = "", description = "", demoAddress = "", repoAddress = ""){
	const repoItem = document.createElement("div");
	repoItem.classList.add("list-item");
	const titleContainer = document.createElement("div");
	titleContainer.classList.add("text");
	const titleTextContainer = document.createElement("h2");
	titleTextContainer.textContent = title;
	titleContainer.appendChild(titleTextContainer);
	repoItem.appendChild(titleContainer);
	if(description) {
		const descContainer = document.createElement("div");
		descContainer.classList.add("text");
		const descTextContainer = document.createElement("p");
		descTextContainer.textContent = description;
		descContainer.appendChild(descTextContainer);
		repoItem.appendChild(descContainer);
	}
	const actionButtonsContainer = document.createElement("div");
	actionButtonsContainer.classList.add("text");
	const repoLink = document.createElement("a");
	repoLink.href = repoAddress;
	repoLink.target = "_blank";
	const repoButton = document.createElement("button");
	repoButton.textContent = "Repo";
	repoLink.appendChild(repoButton);
	actionButtonsContainer.appendChild(repoLink);
	const demoLink = document.createElement("a");
	demoLink.href = demoAddress;
	demoLink.target = "_blank";
	const demoButton = document.createElement("button");
	demoButton.textContent = "Demo";
	demoButton.classList.add("button-2");
	if(!demoAddress) {
		demoButton.disabled = true;
	}
	demoLink.appendChild(demoButton);
	actionButtonsContainer.appendChild(demoLink);
	repoItem.appendChild(actionButtonsContainer);
	document.querySelector("#repo-list").appendChild(repoItem);
}
async function loadRepos(){
	const repos = await fetch("https://api.github.com/users/hiperesp/repos?sort=pushed")
		.then(data => data.text())
		.then(json => JSON.parse(json));
	const repoCountElements = document.querySelectorAll(".repo-count");
	for(let repoCount of repoCountElements) {
		repoCount.textContent = repos.length;
	}
	for(let repo of repos) {
        addRepo(repo.name, repo.description, repo.homepage, repo.html_url);
    }
}
