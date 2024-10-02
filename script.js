// function showClock (){
//     let dateObj =new Date;
//     let month  = ['January','February','March','Aprail','May','June','July','August','Septemer','Octomber','November','December'];

//     let year = dateObj.getFullYear();
//     let monthNum = dateObj.getMonth();
//     let dateCal = dateObj.getDate();
//     let hour = dateObj.getHours();
//     let min = dateObj.getMinutes();
//     let sec = dateObj.getSeconds();
//     let timeFormatted = toTwelveHourFormat(hour)
    
    
//     // Render to element
// document. querySelector('.timeAndDate').innerHTML =
//     (month[monthNum] + ' ' + dateCal +',' + year + ' ' + timeFormatted['time'] + ':' + min +':'+ sec + ' ' + timeFormatted['am_pm']);
    
//     // Set interval to show seconds - every second update the clock
    

// }

// function toTwelveHourFormat(time){
//        let  am_pm = 'AM';
//         if(time>12){
//             time  = time-12;
//             am_pm = 'PM';
//         }

//         return{
//             time : time,
//             am_pm:am_pm
//         };
//     }

//     showClock();
//     setInterval(showClock, 1000);


let script = function(){

    this.orderItems = {};
    

    this.products = {
        32:{
            name : 'Toblerone',
            stock : 13,
            price : 40
        },
        33:{
            name : 'Milo',
            stock : 13,
            price : 70
        }
    };

   this.showClock =function(){
        let dateObj =new Date;
        let month  = ['January','February','March','Aprail','May','June','July','August','Septemer','Octomber','November','December'];
    
        let year = dateObj.getFullYear();
        let monthNum = dateObj.getMonth();
        let dateCal = dateObj.getDate();
        let hour = dateObj.getHours();
        let min = dateObj.getMinutes();
        let sec = dateObj.getSeconds();   
        let timeFormatted = this.toTwelveHourFormat(hour)
        
        console.log(month[monthNum]);
        document. querySelector('.timeAndDate').innerHTML =
        (month[monthNum] + ' ' + dateCal +',' + year + ' ' + timeFormatted['time'] + ':' + min +':'+ sec + ' ' + timeFormatted['am_pm']);
        }
    
    
    this.toTwelveHourFormat= function(time){
        let  am_pm = 'AM';
        if(time>12){
            time  = time-12;
            am_pm = 'PM';
        }

        return{
            time : time,
            am_pm:am_pm
        };
    }
    
this.registerEvents = function(){
    document.addEventListener('click',function(e){
        let targetEi = e.target;
        console.log("targetEi "+targetEi)
        let targetEiClasslist = targetEi.classList;
        console.log("classlist "+targetEiClasslist);
        console.log(targetEiClasslist.contains('productName'))

        if(targetEiClasslist.contains('productImage') || targetEiClasslist.contains('productName')){
                let productContainer = targetEi.closest('div.productColContainer');
                

                let pid = productContainer.dataset.pid;
                let productInfo = loadScript.products[pid]
                console.log(productContainer);
                console.log('eka wada');

                // let dialogForm = '\
                //     <h6>' + productInfo['name'] + '</h6>\
                //     <input type="number" class="form-control" placeholder="Enter quantity" />';

                // BootstrapDialog.confirm({
                //     title: 'Add To Order',
                //     type: BootstrapDialog.TYPE_DEFAULT,
                //     message: dialogForm
                // });

        
                const inputVal = prompt("Enter Your Age");
                console.log(inputVal);
                const orderQty = parseInt(inputVal);

                loadScript.addToOrder(productInfo,pid,orderQty);
        }

        if(targetEiClasslist.contains('deleteOrderItem')){
            let pid = targetEi.dataset.id;
            let productInfo = loadScript.orderItems[pid];
            let orderedquantity = productInfo['orderQty'];
            loadScript.products[pid]['stock'] += orderedquantity;

            delete loadScript.orderItems[pid];
            loadScript.updateOrderItemTable();
        }

        if(targetEiClasslist.contains('quantityUpdateBtn_minus')){
            console.log(targetEi);
            console.log(targetEiClasslist);
            let pid = targetEi.dataset.id;
            let productInfo = loadScript.products[pid];

            loadScript.products[pid]['stock']++;
            loadScript.orderItems[pid]['orderQty']--;
            

            //update new amount
            loadScript.orderItems[pid]['amount'] = loadScript.orderItems[pid]['orderQty']*loadScript.orderItems[pid]['price'];
            //if the orderqty is zero ,delete

            if(loadScript.orderItems[pid]['orderQty']==0){
                delete loadScript.orderItems[pid];
            }
            loadScript.updateOrderItemTable();
        }

        if(targetEiClasslist.contains('quantityUpdateBtn_plus')){
            
            let pid = targetEi.dataset.id;
            let productInfo = loadScript.products[pid];

            loadScript.products[pid]['stock']--;
            loadScript.orderItems[pid]['orderQty']++;
            
            if(loadScript.products[pid]['stock'] ===0){
                alert("we are sorry! stock is zero")
            }

            //update new amount
            loadScript.orderItems[pid]['amount'] = loadScript.orderItems[pid]['orderQty']*loadScript.orderItems[pid]['price'];
            //if the orderqty is zero ,delete

        
            loadScript.updateOrderItemTable();
        }
    });
    }

    this.updateOrderItemTable = function(){
        let ordersContainer = document.querySelector('.pos-items');
        let html = '<p class="itemNoData">No data</p>';
        this.totalOrderAmount = 0.00;

        if(Object.keys(loadScript.orderItems)){
            let tableHtml = `
                        <table id="pos_items_tbl">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <th>PRODUCT</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                __ROWS__
                            </tbody>
                        </table>`

            let rows = '';
            let rowNum = 1;
            for(const[pid,orderItems] of Object.entries(loadScript.orderItems)){
                rows += `
                    <tr>
                        <td>${rowNum}</td>
                        <td>${orderItems['name']}</td>
                        <td>${orderItems['price']}</td>
                        <td>${orderItems['orderQty']}
                            <a href="javascript:void(0);">
                                <i class="fa fa-minus quantityUpdateBtn quantityUpdateBtn_minus" data-id="${pid}" ></i></a>
                            <a href="javascript:void(0);" class="quantityUpdateBtn quantityUpdateBtn_plus" data-id="${pid}">
                                <i class="fa fa-plus quantityUpdateBtn quantityUpdateBtn_plus " data-id="${pid}" ></i></a>
                        </td>
                        <td>${orderItems['amount']}
                        </td>
                        <td>
                            <a href = "javascript:void(0);" > <i class="fa fa-edit"></i></a>
                            <a href = "javascript:void(0);" class="deleteOrderItem" data-id="${pid}" > 
                                <i class="fa fa-trash deleteOrderItem" c data-id="${pid}"></i></a>
                        </td>
                        
                    </tr>
                `
                rowNum++;
                loadScript.totalOrderAmount += orderItems['amount'];

            }
            html = tableHtml.replace('__ROWS__',rows);
        }
            ordersContainer.innerHTML = html;
            document.querySelector('.item_total_value').innerHTML = loadScript.totalOrderAmount;
        

        
    }

    this.addToOrder = function(productInfo,pid,orderQty){
        
        let curItemsIds = Object.keys(loadScript.orderItems);//retrives keys to array
        console.log(curItemsIds);
        let totalAmount = productInfo['price'] * orderQty;
        console.log(curItemsIds.indexOf(productInfo['id']))
        if(curItemsIds.indexOf(pid)>-1){//This method returns the index of the element if it exists in the array
            loadScript.orderItems[pid]['amount'] +=totalAmount;
            loadScript.orderItems[pid]['orderQty'] += orderQty; 
        }else{
            
            loadScript.orderItems[pid] = {
                name : productInfo['name'],
                price: productInfo['price'],
                orderQty : orderQty,
                amount : totalAmount
            };
            console.log(loadScript.orderItems);
            console.log(loadScript.products[pid]['stock']);
        }
        loadScript.products[pid]['stock'] -= orderQty;
        this.updateOrderItemTable();
        
    }

    this.initialize = function(){
        this.showClock();
        this.registerEvents();
    }
};

let loadScript  = new script;
loadScript.initialize();

