var photoArray;
var photoArrayFiltered;

function onPageLoad()
{
    index = 0;
    loadDoc();
}

function loadDoc() 
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            var photoList = this.responseText;
            photoArray = photoList.split(",");
            photoArray[0] = photoArray[0].substring(4);
            document.getElementById("photoListText").innerHTML = photoArray;
            filterList();
            document.getElementById("ImageView").src = "images/" + photoArrayFiltered[index];
            updateCaption();
        }
    };
    xhttp.open("GET", "directory", true);
    xhttp.send();
}

function filterList()
{
    photoArrayFiltered = photoArray.filter(checkKeywords);
    photoArrayFiltered = photoArrayFiltered.filter(checkTime);
    document.getElementById("filteredListText").innerHTML = photoArrayFiltered;
}


function checkKeywords(photoName) 
{
    var url = new URL(window.location.href);
    keywords = url.searchParams.get("keywords");
    document.getElementById("keywordsText").innerHTML = keywords;
    
    if(keywords != null)
    {
    var containsKeywords = photoName.includes(keywords);
    }
    else
    {
    var containsKeywords = true;
    }
    return containsKeywords;
}

function checkTime(photoName) 
{
    var url = new URL(window.location.href);
    start_time_str = url.searchParams.get("start_time");
    end_time_str = url.searchParams.get("end_time");
    
    start_time = new Date(start_time_str);
    end_time = new Date(end_time_str);

    document.getElementById("startTimeText").innerHTML = start_time;
    document.getElementById("endTimeText").innerHTML = end_time;

    photoAttributes = photoName.split("_");
    photoTime = new Date(photoAttributes[1]);

    if (start_time_str == null || end_time_str == null)
    {
        var withinStartEndTime = true;
    } 
    else if (start_time_str.length >= 1 && end_time_str.length >= 1)
    {
        var withinStartEndTime = ((photoTime > start_time) && (photoTime < end_time));
    }
    else
    {
        var withinStartEndTime = true;
    }
    return withinStartEndTime;
}

function prevButton()
{
    if (index <= 0)
    {
    index = 0;
    }
    else
    {
    index--;
    }
    
    document.getElementById("ImageView").src = "images/" + photoArrayFiltered[index];
    document.getElementById("index").innerHTML = index;
    document.getElementById("currentPhoto").innerHTML = "images/" + photoArrayFiltered[index];
    updateCaption();
}

function nextButton()
{
    if (index >= photoArrayFiltered.length -1)
    {
    index = photoArrayFiltered.length -1;
    }
    else
    {
    index++;
    }

    document.getElementById("ImageView").src = "images/" + photoArrayFiltered[index];
    document.getElementById("index").innerHTML = index;
    document.getElementById("currentPhoto").innerHTML = "images/" + photoArrayFiltered[index];
    updateCaption();
}

function updateCaption()
{
    photoAttributes = photoArrayFiltered[index].split("_");
    photoCaption = photoAttributes[0];
    photoTime = photoAttributes[1];
    photoLocation = photoAttributes[2];

    document.getElementById("oldCaption").value = photoArrayFiltered[index];
    document.getElementById("timeText").innerHTML = photoTime;
    document.getElementById("locationText").innerHTML = photoLocation;
    document.getElementById("currentCaption").innerHTML = photoCaption;
}
