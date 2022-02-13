export const BASE_URL = "https://ihsanback.herokuapp.com"; 
export const countByDate = ( arr, date ) => {
    let count = arr.filter((obj) => obj.date == date).length;
    return count;
}
//https://ihsanback.herokuapp.com
//http://localhost:4000