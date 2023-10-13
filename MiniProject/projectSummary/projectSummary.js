import { LightningElement, api, track, wire } from "lwc";
import insertProjectRecords from "@salesforce/apex/ProjectSummary.insertProjectData";
//import getProject from "@salesforce/apex/ProjectSummary.getProjectDetails";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class ProjectSummary extends LightningElement {
  @api insertFirstName;
  @api insertSecondName;
  @api insertThirdName;
  @api insertFourName;
  @api insertFifthName;
  title = "";
  message = "";
  variant = "";
  @track listOfProjectRecord = [];
//  @api projectDetails = [];
  handle_First_Name_Change(event) {
    this.insertFirstName = event.detail.value;
  }
  handle_Second_Name_Change(event) {
    this.insertSecondName = event.detail.value;
  }
  handle_Third_Name_Change(event) {
    this.insertThirdName = event.detail.value;
  }
  handle_Forth_Name_Change(event) {
    this.insertFourName = event.detail.value;
  }
  handle_Fifth_Name_Change(event) {
    this.insertFifthName = event.detail.value;
  }

 /* @wire(getProject) wiredProjects({ data, error }) {
    if (data) {
      console.log("pppppppppppppppppppppp");
      this.projectDetails = data;
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  }*/

  handleSubmit(event) {
    console.log("sddddddddddddddddddddddd");
    console.log("insertFirstName", this.insertFirstName);
    console.log("insertSecondName", this.insertSecondName);
    console.log("insertThirdName", this.insertThirdName);
    console.log("insertFourName", this.insertFourName);
    console.log("insertFifthName", this.insertFifthName);
    if (
      this.insertFirstName == null ||
      this.insertSecondName == null ||
      this.insertThirdName == null ||
      this.insertFourName == null ||
      this.insertFifthName == null ||
      this.insertFirstName == "" ||
      this.insertSecondName == "" ||
      this.insertThirdName == "" ||
      this.insertFourName == "" ||
      this.insertFifthName == ""
    ) {
      this.title = "Something went wrong";
      this.message = "Please fill all the mandatory field";
      this.variant = "error";
      this.showToastMessage(this.title, this.message, this.variant);
    } else {
      console.log("ELSEEEEEEEEEEEEEEEEEE");
      let fieldSize = this.checkDuplicateValue();
      console.log("ELSEEEEEEEEEEEEEEEEEE", fieldSize);
      if (fieldSize == 5) {
        console.log("ddddddddddddddddd", this.projectDetails);
				//console.log("ddddddddddddddddd", this.projectDetails.Name1__c);	
        insertProjectRecords({
          firstName: this.insertFirstName,
          secondName: this.insertSecondName,
          thirdName: this.insertThirdName,
          forthName: this.insertFourName,
          fifthName: this.insertFifthName,
        }).then((result) => {
          this.title = "project created succesfully!!";
          this.message = "project created successfully";
          this.variant = "success";
          this.showToastMessage(this.title, this.message, this.variant);
        }).catch((error) => {
          this.title = "Record are already exist!!";
          this.message = "Record are already exist!!";
          this.variant = "error";
          this.showToastMessage(this.title, this.message, this.variant);
        });
      }
    }
  }
  showToastMessage(title, message, variant) {
    const event = new ShowToastEvent({
      title: this.title,
      message: this.message,
      variant: this.variant,
      mode: "dismissable",
    });
    this.dispatchEvent(event);
  }
  checkDuplicateValue() {
    console.log("checkDuplicateValue!!!!!!!!!!!!!!!!");
    let myset = new Set();
    myset
      .add(this.insertFirstName)
      .add(this.insertSecondName)
      .add(this.insertThirdName)
      .add(this.insertFourName)
      .add(this.insertFifthName);
    console.log("myset!!!!!!!!!!!!!!!!", myset);
    console.log("myset!!!!!!!!!!!!!!!!", myset.size);
    if (myset.size != 5) {
      this.title = "Something went wrong";
      this.message = "Some field value was duplicate!";
      this.variant = "error";
      this.showToastMessage(this.title, this.message, this.variant);
    }
    return myset.size;
  }
}

