
var data;

var xhr = new XMLHttpRequest();


function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', { month: 'long' });
}

function presentJob(x, m){
    if(x == 0){
        if(m){
            return 'Present';
        }
        else{
            return ''; 
        }        
    }
    else{
        if(m){
            return getMonthName(x);
        }
        else{
            return x; 
        }
    }
}


function jobCards(data){

    var jobCard = '';
    for(var job of data.jobs){jobCard += `<div class="job-card">
    <div class="job-title">
        <h4>${job.title}</h4>
            <p>${job.company} | ${job.location.city}, ${job.location.state}</p>
            <p>${getMonthName(job.deration.start.month)} ${job.deration.start.year} - ${presentJob(job.deration.end.month, true)} ${presentJob(job.deration.end.year, false)}</p>
    </div>
    <div class="job-disc">
        <p>Job summary:</p>
        <ul>
        `        
        
    for(var sum of job.summary){
        jobCard += `<li>${sum}</li>
        `
    }

    jobCard += `</ul>
    </div>
</div>`}


    return jobCard;
}


function edCards(data){

    var edCard = '';
    for(var ed of data.education){edCard += `
    <div class="edu-card">
        <h4>${ed.school} | ${ed.deration.start} - ${ed.deration.end}</h4>
        <p>${ed.major}</p>
        <p>Summary.</p>
        <ul>
        `;
        for(var sum of ed.summary){
            edCard += `    <li>${sum}</li>
        `;
        }   

       edCard += `</ul>
    </div>
`;
    }
    edCard += `</div>`
    return edCard;
}



function buildRes(data){

    var work = `<h3>Work Experience</h3>`;
    work += jobCards(data);

    document.getElementById("work").innerHTML = work;


    education = `<div id="edu-cont">
    <h3>Education</h3>`;
    education += edCards(data);
    document.getElementById("education").innerHTML = education;

    //document.getElementById("education").innerHTML = work;


}





xhr.onreadystatechange = function()
{
    

    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            buildRes(JSON.parse(xhr.responseText));
        } else {
            console.error(xhr);
        } 
    }  
};
xhr.open("GET", '../data/resume.json', true);
xhr.send();
    
