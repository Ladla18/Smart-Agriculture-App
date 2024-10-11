const listItems = [
    ['apple',1.0,5],
    ['orange',10.0,5],
    ['apple',10.0,5]
]
var highSellingPrice = 0;
var highSellingName = ''
for(let i=0;i<listItems.length;i++){
    
        if(highSellingPrice == 0){
            highSellingName = listItems[i][0];
        }
        price = listItems[i][1]*listItems[i][2];
        if(highSellingPrice<price){
            highSellingPrice = price;
        }

        for(let j=0;j<listItems.length;j++){
            if(j!=i){
                if(listItems[j][0]==highSellingName){
                    highSellingPrice = highSellingPrice + listItems[j][1]*listItems[j][2];
                }else{
                    let newPrice = listItems[j][1]*listItems[j][2];
                    if(newPrice>highSellingPrice){
                        highSellingPrice = newPrice;
                        highSellingName = listItems[j][0]
                    }
                }

            }
        }
}
console.log(highSellingName)