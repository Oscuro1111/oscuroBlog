
function do_() {

    return new Promise((resolve, reject) => resolve([{ "name": "async__" }]));
}


do_().then(data => {
    console.log(data[0].name);
});
