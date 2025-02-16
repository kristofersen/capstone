// Define the WorkPermit interface
export interface WorkPermit {
    _id: string; // Mongoose generated ID
    id: string;
    userId?: string; // Can be a string for front end
    permittype?: string; // Default value can be handled in logic
    classification: string;
    workpermitstatus: string;
    transaction: string;
    transactionstatus: string;
    formData: FormData;
    createdAt: string;
    receipt: Receipt;
    permitFile: string;
    applicationdateIssued: string;
    applicationComments: string;
    permitExpiryDate: string;
  }

  
  export interface Receipt {
      receiptId?: string; // Optional
      modeOfPayment?: string; // Optional
      receiptDate?: string; // Optional
      amountPaid?: string; // Optional
      receiptFile?: string;
    }
    
  export interface GroupedBusinessPermit {
    _id?: string;
    id: string; // Business ID
    permits: BusinessPermit[]; // Array of BusinessPermit
  }
  export interface BusinessPermit {
      _id: string;
      id: string;
      userId: string;
      permittype?: string;
      businesspermitstatus?: string;
      businessstatus?: string;
      forretirement?: string;
      classification?: string;
      transaction?: string;
      amountToPay?: string;
      permitFile: string;
      permitDateIssued?: string;
      permitExpiryDate?: string;
      expiryDate?: string;
      applicationdateIssued: Date;
      applicationComments?: string;
    
      owner: Owner;
      business: Business;
      otherbusinessinfo: OtherBusiness;
      mapview: MapView;
      businesses: Businesses[];
      files: Files;
      department: Department; // Change to object with key-value pairs
      statementofaccount: Statement;
      receipt: ReceiptBP;
      createdAt?: string;
    }
    
  export interface Owner {
    corporation?: boolean;
    lastname?: string;
    firstname?: string;
    middleinitial?: string;
    civilstatus?: string;
    companyname?: string;
    gender?: string;
    citizenship?: string;
    tinnumber?: string;
    representative?: boolean;
    houseandlot?: string;
    buildingstreetname?: string;
    subdivision?: string;
    region?: string;
    province?: string;
    municipality?: string;
    barangay?: string;
    telephonenumber?: string;
    mobilenumber?: string;
    email?: string;
    representativedetails?: RepDetails;
    }
    
    export interface RepDetails {
    repfullname: string,
    repdesignation: string,
    repmobilenumber: string,
    }
  
    export interface Business {
    businessname?: string,
    businessscale?: string,
    paymentmethod?: string,
    businessbuildingblocklot?: string,
    businessbuildingname?: string,
    businesssubcompname?: string,
    businessregion?: string,
    businessprovince?: string,
    businessmunicipality?: string,
    businessbarangay?: string,
    businesszip?: string,
    businesscontactnumber?: string,
    ownershiptype?: string,
    agencyregistered?: string,
    dtiregistrationnum?: string,
    dtiregistrationdate?: string,
    dtiregistrationexpdate?: string,
    secregistrationnum?: string,
    birregistrationnum?: string,
    industrysector?: string,
    businessoperation?: string,
    typeofbusiness?: string,
    
    }
  
    export interface ReceiptBP {
      receiptId: string,
      receiptDate: string,
      receiptFile: string,
      }
    
    export interface OtherBusiness {
    dateestablished?: string,
    startdate?: string,
    occupancy?: string,
    otherbusinesstype?: string,
    businessemail?: string,
    businessarea?: string,
    businesslotarea?: string,
    numofworkermale?: string,
    numofworkerfemale?: string,
    numofworkertotal?: string,
    numofworkerlgu?: string,
    lessorfullname?: string,
    lessormobilenumber?: string,
    monthlyrent?: string,
    lessorfulladdress?: string,
    lessoremailaddress?: string,
    }
    
    export interface MapView{
    lat: string,
    lng: string,
    }
    
  
export interface Businesses {
    _id: string;
    businessNature: string;
    businessType: string;
    capitalInvestment: number;
    lastYearGross: number;
    tax: string;
  }
  export interface BusinessNatureOption {
    value: string;
    label: string;
  }

 
    
    export interface Department{
     
      Zoning: string;
      OffBldOfcl: string;
      CtyHlthOff: string;
      BreuFrPrt: string;
    
    }
    
    export interface Files {
        document1: string | null; // Optional
        document2: string | null; // Optional
        document3: string | null; // Optional
        document4: string | null; // Optional
        document5: string | null; // Optional
        document6: string | null; // Optional
        document7: string | null; // Optional
        document8: string | null; // Optional
        document9: string | null; // Optional
        document10: string | null; // Optional
        remarksdoc1: string | null;
        remarksdoc2: string | null;
        remarksdoc3: string | null;
        remarksdoc4: string | null;
        remarksdoc5: string | null;
        remarksdoc6: string | null;
        remarksdoc7: string | null;
        remarksdoc8: string | null;
        remarksdoc9: string | null;
        remarksdoc10: string | null;
      
      }
  
    export interface Statement{
      permitassessed: string;
      dateassessed: string;
      mayorspermit: string;
      sanitary:  string;
      health:  string;
      businessplate:  string;
      zoningclearance:  string;
      annualInspection:  string;
      environmental:  string;
      miscfee:  string;
      liquortobaco:  string;
      liquorplate:  string;
      statementofaccountfile: string;
  }
 

  //sds
  export interface PersonalInformation {
    lastName: string;
    firstName: string;
    middleInitial?: string; // Optional
    permanentAddress?: string; // Optional
    currentlyResiding: boolean;
    temporaryAddress?: string; // Optional
    dateOfBirth?: string; // Optional
    age?: number; // Optional
    placeOfBirth?: string; // Optional
    citizenship?: string; // Optional
    civilStatus?: string; // Optional
    gender?: string; // Optional
    height?: string; // Optional
    weight?: string; // Optional
    mobileTel?: string; // Optional
    email?: string; // Optional
    educationalAttainment?: string; // Optional
    natureOfWork?: string; // Optional
    placeOfWork?: string; // Optional
    companyName?: string; // Optional
    workpermitclassification?: string;
  }
  
  export interface EmergencyContact {
    name2?: string; // Optional
    mobileTel2?: string; // Optional
    address?: string; // Optional
  }
  
  export interface Files {
    document1: string | null; // Optional
    document2: string | null; // Optional
    document3: string | null; // Optional
    document4: string | null; // Optional
  }
  
  export interface Receipt {
    receiptId?: string; // Optional
    modeOfPayment?: string; // Optional
    receiptDate?: string; // Optional
    amountPaid?: string; // Optional
    receiptFile?: string;
  }
  
  export interface FormData {
    personalInformation: PersonalInformation;
    emergencyContact: EmergencyContact;
    files: Files;
  
  }
  
export interface FormContent {
  personalInformation: PersonalInformation;
  emergencyContact: EmergencyContact;
  files: Files;

}

//For Work Permit Page
export interface WorkPermits {
  _id: string; // Mongoose generated ID
  id: string;
  userId?: string; // Can be a string for front end
  permittype?: string; // Default value can be handled in logic
  workpermitstatus: string;
  transaction: string;
  transactionstatus: string;
  formData: FormContent;
  createdAt?: string;
  receipt: Receipt;
  permitFile?: string;
  applicationComments: string;
}

  export interface User {
    _id: string;
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string,
    contactNumber: string,
    address: string,
    password: string,
  }
