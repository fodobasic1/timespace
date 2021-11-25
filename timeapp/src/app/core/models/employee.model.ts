export class Employee {
    Id: number;
    FirstName: string;
    LastName: string;
    MiddleName?: string;
    City: string;
    Phone: string;
    Address: string;
    State: string;
    Fax: string;
    ReferenceId: string;
    Birth: string;
    WorkingSchemeType: number;
    Occupation: string;
    Unit1: string;
    Unit2: string;
    Unit3: string;
    Email: string;
    Other: string;
    MobilePhone: string;
    OrganizationalUnitId: number;

    AdditionalField1: string;
    AdditionalField2: string;
    AdditionalField3: string;
    AdditionalField4: string;
    AdditionalField5: string;
    AdditionalField6: string;
    AdditionalField7: string;
    AdditionalField8: string;
    AdditionalField9: string;
    AdditionalField10: string;

    CurrentWorkingScheme: number;

    constructor(
        _firstName: string,
        _lastName: string,
        _email: string,
        _middleName: string,
        _address: string) {
            this.FirstName = _firstName;
            this.LastName = _lastName;
            this.Email = _email;
            this.Address= _address;
            this.MiddleName = _middleName
        }
}