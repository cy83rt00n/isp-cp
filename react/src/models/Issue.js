import Address from "./Address";
import Engineer from "./Engineer";
import Term from "./Term";

let Issue = {
    id:0,
    report_ts: 0,
    exec_ts: 0,
    resolve_ts: 0,
    report_status: new Term({}),
    address: Address,
    engineer: Engineer,
    comment: '',
}

export default Issue;