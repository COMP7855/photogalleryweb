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
    // scroll to top of page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function filterList()
{
    // get search parameters
    var url = new URL(window.location.href);
    keywords = url.searchParams.get("keywords");
    start_time_str = url.searchParams.get("start_time");
    end_time_str = url.searchParams.get("end_time");
    searchLocation = url.searchParams.get("search_location");

    // convert time strings to dates
    if(start_time_str != null) start_time = new Date(start_time_str);
    if(end_time_str != null) end_time = new Date(end_time_str);

    // print search parameters to screen
    document.getElementById("keywordsText").innerHTML = keywords;
    document.getElementById("startTimeText").innerHTML = start_time_str;
    document.getElementById("endTimeText").innerHTML = end_time_str;
    document.getElementById("searchLocationText").innerHTML = searchLocation;
    
    // create filtered list based on search parameters
    photoArrayFiltered = photoArray.slice(0); // copy array
    if (keywords != null) {photoArrayFiltered = photoArrayFiltered.filter(checkKeywords, keywords);}
    if (start_time_str != null) {photoArrayFiltered = photoArrayFiltered.filter(checkStartTime, start_time);}
    if (end_time_str != null) {photoArrayFiltered = photoArrayFiltered.filter(checkEndTime, end_time);}
    if (searchLocation != null) {photoArrayFiltered = photoArrayFiltered.filter(checkLocation, searchLocation);}
    document.getElementById("filteredListText").innerHTML = photoArrayFiltered;
}


function checkKeywords(photoName) 
{
    if(this != null)
    {
        var containsKeywords = photoName.includes(this);
    }
    else
    {
        var containsKeywords = true;
    }
    return containsKeywords;
}

function checkStartTime(photoName) 
{
    photoAttributes = photoName.split("_");
    photoTime = new Date(photoAttributes[1]);
    
    if (!isNaN(this.getTime())) // if valid date
    {
        var afterStartTime = (photoTime >= this);
    }
    else
    {
        var afterStartTime = true;
    }
    return afterStartTime;
}

function checkEndTime(photoName) 
{
    photoAttributes = photoName.split("_");
    photoTime = new Date(photoAttributes[1]);

    if (!isNaN(this.getTime())) // if valid date
    {
        var beforeEndTime = (photoTime <= this);
    }
    else
    {
        var beforeEndTime = true;
    }
    return beforeEndTime;
}

function checkLocation(photoName) 
{
    photoAttributes = photoName.split("_");
    photoLocation = photoAttributes[2];

    if(this != null)
    {
        var containsLocation = photoLocation.includes(this);
    }
    else
    {
        var containsLocation = true;
    }
    return containsLocation;
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
