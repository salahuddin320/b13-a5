let currentTab = "all";
const tabActive = ["bg-[#4A00FF]", "text-[#FFFF]"];
const tabInactive = ["bg-[#FFFF]", "text-[#64748B]", "shadow-sm"];

const openContainer = document.getElementById("open-container");

const issueContainer = document.getElementById("issue-container");
const closedContainer = document.getElementById("closed-container");


const switchTab = (tab) => {
    // console.log(tab);
    currentTab = tab;
    const tabs = ['all', 'open', 'closed'];
    for (const t of tabs) {
        const tabName = document.getElementById("tab-" + t);
        //   console.log(tabName);
        if (tab === t) {
            tabName.classList.add(...tabActive);
            tabName.classList.remove(...tabInactive);
        } else {
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    };

    const section = [issueContainer, openContainer, closedContainer];
    for (const sec of section) {
        sec.classList.add("hidden");
    }

    if (tab === "all") {
        issueContainer.classList.remove("hidden");
    } else if (tab === "open") {
        openContainer.classList.remove("hidden");
    } else if (tab === "closed") {
        closedContainer.classList.remove("hidden");
    }
};
switchTab(currentTab);



const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => displayIssues(json.data));


    // const openIssue = (open) => {
    //     const opened = allIssue.filter(issue=>issue.open === open);
    //     displayIssues(opened);
    // };

    const displayIssues = (issues) => {
        // console.log(issues);
        // let totalIssue = issues;
        // if(currentTab === "open"){
        //    const totalIssue = issues.filter(issue => issue.status === "open");
        //    console.log(totalIssue) 
        // }
        const openContainer = document.getElementById("open-container");
        const closedContainer = document.getElementById("closed-container");
        const issueContainer = document.getElementById("issue-container");
        issueContainer.innerHTML = "";
        openContainer.innerHTML = "";
        closedContainer.innerHTML = "";

        const openIssues = issues.filter(issue => issue.status === "open");
        const closedIssues = issues.filter(issue => issue.status === "closed");

       const card = (issue) => {
            // console.log(issue)

            const issueDiv = document.createElement("div");
            issueDiv.innerHTML = `
                <div class="card p-4 bg-white border-t-2 border-[green] rounded-t-4 ">
                <div class="bg-white mb-2 space-y-2">
                    <div class="flex justify-between">
                        <img class="w-5" src="./assets/Open-Status.png" alt="">
                        <div class="bg-[#FEECEC] p-2 w-[80px] h-6 text-[12px] text-[#EF4444] rounded-2xl flex justify-center items-center">${issue.priority.toUpperCase()}</div>
                    </div>
                    <h2 class="font-semibold text-sm">${issue.title}</h2>
                    <p class="text-sm text-[#64748B]">${issue.description}
                    </p>
                    <div class="flex gap-3">
                        <div class="bg-[#FEECEC] p-2 h-6 text-[12px] text-[#EF4444] rounded-2xl flex justify-center items-center">${issue.labels[0].toUpperCase()}</div>
                        <div class="bg-[#FEECEC] p-2  h-6 text-[12px] text-[#EF4444] rounded-2xl flex justify-center items-center">${issue.labels[1]}</div>
                    </div>
                </div>
                <div class="bg-white rounded-b-4 space-y-2">
                    <p class="text-sm text-[#64748B]">${issue.id} by ${issue.author}</p>
                    <p class="text-sm text-[#64748B]">${issue.updatedAt.split("T")[0]}</p>
                </div>
            </div>
           `;
            return issueDiv
        }
        issues.forEach(issue =>{
            issueContainer.append(card(issue));
        })
        openIssues.forEach(issue =>{
            openContainer.append(card(issue));
        })
        closedIssues.forEach(issue =>{
            closedContainer.append(card(issue));
        });
    };
};
loadIssues();