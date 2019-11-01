class MyPromise {
    constructor(executor) {
        if (typeof executor !== "function") throw new Error("Executor must be function!");


        this.$state = "PENDING";
        this.$chained = [];

        const resolve = res => {
            if (this.$state !== "PENDING") {
                return;
            }
            this.$state = "FULLFILED";
            this.$internalValue = res;

            // If somebody called `.then()` while this promise was pending, need
            // to call their `onFulfilled()` function

            for (const { onFullfilled } of this.$chained) {
                 
                this.then(onFullfilled, null, resolve);

                 this.$chained.shift();
            }
        };

        const reject = err => {
            if (this.$state !== "PENDING") {
                return;
            }
            this.$state = "REJECTED";
            this.$internalValue = err;

            for (const { onRejected } of this.$chained) {
                onRejected(err);
            }
        };


        try {

            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }


    then(onFullfilled, onRejected, resolve) {
        if (this.$state === "FULLFILED") {

            this.$state = "PENDING";
            if (resolve){
                onFullfilled(this.$internalValue, resolve);
            }
            else {
                onFullfilled(this.$internalValue, null);
            }
        } else if (this.$state === "REJECTED") {
            onRejected(this.$internalValue);
        } else {
            console.log("THen");
            this.$chained.push({ onFullfilled: onFullfilled, onRejected: onRejected });
        }
        return this;
    }
}


function start() {

    var task = new MyPromise(resolve => setTimeout(_ => resolve("World"), 2000));

    task.then((msg2,resolve) => setTimeout(_ => resolve(`Hello ${msg2}`), 3000)).then((res ,resolve)=>resolve("ok"+res));


    task.then((data,resolve)=>resolve(`Done:${data}`)).then(res=>{console.log("What"+`${res}`)});


}

start();

