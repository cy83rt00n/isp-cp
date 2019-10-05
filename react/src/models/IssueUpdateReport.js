import Address from "./Address";
import Engineer from "./Engineer";
import IssueStatus from "./IssueStatus";

function IssueUpdateReport () {
    let address = Address;
    let engineer = Engineer;
    let comment="";
    let report_status=IssueStatus;
    let execution_date=0;
    return this;
};

export default IssueUpdateReport;