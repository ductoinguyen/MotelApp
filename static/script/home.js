$('#menu').load('../static/page/menu-home.html');
$('#footer').load('../static/page/footer.html');

// Menu
window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
        document.getElementById('head-menu').className = "navbar navbar-expand-md navbar-light sticky";
    } else {
        document.getElementById('head-menu').className = "navbar navbar-expand-md navbar-light";
    }
});

// Thanh trượt khoảng giá
$(document).ready(function() {
    $('#min_price').val(1.8);
    $('#max_price').val(20);
    $('#price_range').slider({
        range: true,
        min: 1.8,
        max: 20,
        values: [1.8, 20],
        step: 0.2,
        slide:function(event, ui) {
            $('#price_show').html(ui.values[0] + ' - ' + ui.values[1] + ' triệu/tháng');
        },
        stop:function(event, ui) {
            $('#min_price').val(ui.values[0]);
            $('#max_price').val(ui.values[1]);
        }
    });
});

// Query input
const searchWrapper = document.querySelector('.search-input');
const inputBox = searchWrapper.querySelector('input');
const suggBox = searchWrapper.querySelector('.autocom-box');
suggestions = []

// Tìm kiếm
console.log($('#min_price').val());
function searchRaw() {
    keyword = document.getElementById('searchInput').value;
    room_type = document.getElementById('itemType').value;
    min_price = document.getElementById('min_price').value;
    max_price = document.getElementById('max_price').value;
    area_range = document.getElementById('area_range').value;
    location.href = '../' + room_type + '/dia-chi/' + keyword + '/0/gia/' + min_price + '/' + max_price + '/dien-tich-tu/' + area_range;
    
    // fetch('/tim-kiem', {
    //     method: "POST",
    //     credentials: "include",
    //     body: JSON.stringify({keyword: keyword, room_type: room_type, min_price: min_price, max_price: max_price, area_range: area_range}),
    //     cache: "no-cache",
    //     headers: new Headers({
    //         "content-type": "application/json"
    //     })
    // })
    // .then(
    //     resp => {
    //         if (resp.status == 200) {
    //             resp.json()
    //             .then(
    //                 data => {
    //                     if (data.result == "success") {
                            
    //                     } else {

    //                     }
    //                 }
    //             )
    //         }
    //     }
    // )
}

inputBox.onkeyup = (e) => {
    if (e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 13) {
        let userData = e.target.value;
        // console.log(userData);
        let emptyArray = [];
        
        if (userData) {
            fetch('../recommendSearch/' + userData)
            .then(
                resp => {
                    if (resp.status == 200) {
                        resp.json()
                        .then(
                            data => {
                                suggestions = []
                                for (var i = 0; i < data.length; i++) {
                                    suggestions.push(data[i].address);
                                }
                                emptyArray = suggestions;
                                emptyArray = emptyArray.map((data) => {
                                    return data = '<div>'+ data +'</div>';
                                });
                                // console.log(emptyArray);
                                searchWrapper.classList.add('active');
                                showSuggestions(emptyArray);
                                let allList = suggBox.querySelectorAll('div');
                                for (let i = 0; i < allList.length; i++) {
                                    allList[i].setAttribute('onclick', 'searchSelect(this)');
                                }
                            }
                        )
                    }
                }
            )
        } else {
            searchWrapper.classList.remove('active');
        }
    } else {
        if (e.keyCode == '40') {
            if (document.querySelector('.pointed') == null) {
                suggBox.firstElementChild.classList.add('pointed');
                document.querySelector('.autocom-box').scrollIntoView(false);
            } else {
                if (document.querySelector('.pointed') == suggBox.lastElementChild) {
                    document.querySelector('.pointed').scrollIntoView(false);
                    document.querySelector('.pointed').classList.remove('pointed');
                    suggBox.firstElementChild.classList.add('pointed');
                    document.querySelector('.pointed').scrollIntoView(false);
                } else {
                    document.querySelector('.pointed').nextElementSibling.classList.add('pointed');
                    document.querySelector('.pointed').classList.remove('pointed');
                    document.querySelector('.autocom-box').scrollIntoView(false);
                    if (document.querySelector('.pointed') == suggBox.lastElementChild) {
                        document.querySelector('.pointed').scrollIntoView(false);
                    }
                }
            }
        } else if (e.keyCode == '38') {
            if (document.querySelector('.pointed') == null) {
                suggBox.lastElementChild.classList.add('pointed');
                document.querySelector('.pointed').scrollIntoView(false);
            } else {
                if (document.querySelector('.pointed') == suggBox.firstElementChild) {
                    document.querySelector('.pointed').classList.remove('pointed');
                    suggBox.lastElementChild.classList.add('pointed');
                    document.querySelector('.pointed').scrollIntoView(false);
                } else {
                    var nodes = document.querySelectorAll('.pointed');
                    document.querySelector('.pointed').previousElementSibling.classList.add('pointed');
                    nodes[nodes.length - 1].classList.remove('pointed');
                    document.querySelector('.autocom-box').scrollIntoView(false);
                    if (document.querySelector('.pointed') == suggBox.firstElementChild) {
                        document.querySelector('.pointed').scrollIntoView(false);
                    }
                }
            }
        } else if (e.keyCode == '13') {
            searchRaw();
        }
    } 
}

function showSuggestions(list) {
    let listData;
    // if (!list.length) {
    //     userValue = inputBox.value;
    //     listData = '<div>'+ userValue +'</div>';
    // } else {
    //     listData = list.join('');
    // }
    listData = list.join('');
    suggBox.innerHTML = listData;
}
function searchSelect(elmt) {
    
}

// Chuyển giữa các tab gợi ý
let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];

let tabsPane = tabHeader.getElementsByTagName("div");

for (let i=0; i<tabsPane.length; i++){
 	tabsPane[i].addEventListener("click", function() {
		tabHeader.getElementsByClassName("tab-active-head")[0].classList.remove("tab-active-head");
		tabsPane[i].classList.add("tab-active-head");
		tabBody.getElementsByClassName("tab-active-body")[0].classList.remove("tab-active-body");
		tabBody.getElementsByClassName("tab-content")[i].classList.add("tab-active-body");

		tabIndicator.style.left = `calc(calc(100% / 4) * ${i})`;
	});
}
