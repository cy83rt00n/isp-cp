import Address from "./Address";
import Engineer from "./Engineer";
import IssueStatus from "./IssueStatus";

function Issue() {
    let id = 0;
    let report_ts = 0;   // Дата постановки задачи
    let exec_ts= 0;     // Дата передачи заявки исполнителю
    let resolve_ts= 0;  // Дата закрытия заявки
    let report_status= IssueStatus;    // Статус заявки
    let address= Address;   // Адрес
    let engineer= Engineer; // Исполнитель
    let comment= '';        // Комментарий
    let history=[];
    return this;
}

export default Issue;