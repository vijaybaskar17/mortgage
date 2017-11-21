/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * The sample smart contract for documentation topic:
 * Writing Your First Blockchain Application
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the car structure, with 4 properties.  Structure tags are used by encoding/json library

type PropertyDetails  struct {

	propertysize      int  `json:"propertysize"`
	PropertyValue  int `json:"propertyvalue"`
	YearPurchased  int `json:"YearPurchased"`
	Address      string `json:"Address"`
	
	
}

type LoanPurpose struct {
	PropertyType   string `json:"PropertyType"`
	RequiredAmount  int  `json:"RequiredAmouunt"`
	PurposeofLoan   string `json:"PurposeofLoan"`
}

type Documents struct {
	TaxReturns  int  `json:"TaxReturns"`
	BankStatements  int  `json:"BankStatements"`
	VerificationOfDeposit   int `json:"VerificationOfDeposit"`
	CpaLetter    string `json:"VerificationOfDeposit"`
	HomeInsurance string `json:"HomeInsurance"`
}
type Preclosing struct {
	EmiRemaining  int  `json:"EmiRemaining "`
	PenaltyForPreclosure  int  `json:"PenaltyForPreclosure"`
	Installment   int `json:"Installment"`
	DocumentForClosing   string `json:"DocumentForClosing"`
	PaymentMode string `json:"PaymentMode"`
}
type companyDetails struct {
	EmploymentType  int  `json:"EmploymentType "`
	CompanyName  int  `json:"CompanyName"`
	JoiningDate   int `json:"JoiningDate"`
	FixedSalary   string `json:"FixedSalary"`
	RetiredAge string `json:"RetiredAge"`

}



/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryCar" {
		return s.queryCar(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "Property" {
		return s.Property(APIstub, args)
	} else if function == "LoanDetails" {
		return s.LoanDetails(APIstub)
	} else if function == "uploaddocuments" {
		return s.uploaddocuments(APIstub, args)
	} else if function == "PreclosingDetails" {
		return s.PreclosingDetails(APIstub, args)
	} else if function == "CompanyDetails" {
		return s.CompanyDetails(APIstub, args)
	} else if function == "CompanyDetails" {
		return s.CompanyDetails(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) Query(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	carAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(carAsBytes)
}


func (s *SmartContract) Property(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	fmt.println("Enter Property Details");
	if len(args[0])<= 0{
        return shim.Error("1st argument must be a non-empty string")
    }
    if len(args[1]) <= 0 {
        return shim.Error("2st argument must be a non-empty string")
    }
    if len(args[2]) <= 0 {
        return shim.Error("3rd argument must be a non-empty string")
    }
    if len(args[3]) <= 0 {
        return shim.Error("4th argument must be a non-empty string")
	}

	PropertyDetails:PropertyDetails{}
	PropertyDetails.Propertysize, err = strconv.Atoi(args[0])
    if err != nil {
        return shim.Error("Failed to get PropertyValue as cannot convert it to int")
	}
	PropertyDetails.PropertyValue, err = strconv.Atoi(args[1])
    if err != nil {
        return shim.Error("Failed to get PropertyValue as cannot convert it to int")
	}
	
    PropertyDetails.YearPurchased, err = strconv.Atoi(args[2])
    if err != nil {
        return shim.Error("Failed to get YearPurchased as cannot convert it to int")
    }
	PropertyDetails.Address =args[3]
	fmt.Println("Address", Address)

	PropertyDetailsAsBytes, err := stub.GetState("getPropertyDetails")
    if err != nil {
        return shim.Error("Failed to get PropertyDetails")
	}
	
	
    
func (s *SmartContract) LoanDetails(APIstub shim.ChaincodeStubInterface) sc.Response {
	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}

	fmt.println("Enter LoanDetails");
	if len(args[0])<= 0{
        return shim.Error("1st argument must be a non-empty string")
    }
    if len(args[1]) <= 0 {
        return shim.Error("2st argument must be a non-empty string")
    }
    if len(args[2]) <= 0 {
        return shim.Error("3rd argument must be a non-empty string")
    }

	LoanPurpose:LoanPurpose{}
	
	LoanPurpose.PurposeofLoan =args[0]
	fmt.Println("LoanPurpose",LoanPurpose )
	
    LoanPurpose.RequiredAmount, err = strconv.Atoi(args[1])
    if err != nil {
        return shim.Error("Failed to get RequiredAmount as cannot convert it to int")
    }
	LoanPurpose.PropertyType =args[2]
	fmt.Println("PropertyType", PropertyType)

	LoanPurposeAsBytes, err := stub.GetState("getLoan")
    if err != nil {
        return shim.Error("Failed to get Loan")
    }
	

}


func (s *SmartContract)uploaddocuments(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5 ")
	}
	fmt.println("Please upload documents");
	if len(args[0])<= 0{
        return shim.Error("1st argument must be a non-empty string")
    }
    if len(args[1]) <= 0 {
        return shim.Error("2st argument must be a non-empty string")
    }
    if len(args[2]) <= 0 {
        return shim.Error("3rd argument must be a non-empty string")
	} 
	
	Documents:Documents{}
	
	Documents.TaxReturns =args[0]
	fmt.Println("TaxReturns",TaxReturns)
	
	Documents.BankStatements =args[1]
	fmt.Println("BankStatements", BankStatements)

	Documents.DepositVerification =args[2]
	fmt.Println("DepositVerification", DepositVerification)

	Documents.CpaLetter =args[3]
	fmt.Println("CpaLetter", CpaLetter)

	Documents.HomeInsurance =args[4]
	fmt.Println("HomeInsurance",HomeInsurance )

	DocumentsAsBytes, err := stub.GetState("getDocuments")
    if err != nil {
        return shim.Error("Failed to get Documents")
    }


}
func (s *SmartContract)PreclosingDetails(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	
		if len(args) != 5 {
			return shim.Error("Incorrect number of arguments. Expecting 5 ")
		}
		fmt.println("Enter Preclosing Details");
		if len(args[0])<= 0{
			return shim.Error("1st argument must be a non-empty string")
		}
		if len(args[1]) <= 0 {
			return shim.Error("2st argument must be a non-empty string")
		}
		if len(args[2]) <= 0 {
			return shim.Error("3rd argument must be a non-empty string")
		} 
		
		if len(args[2]) <= 0 {
			return shim.Error("3rd argument must be a non-empty string")
		} 

		if len(args[2]) <= 0 {
			return shim.Error("3rd argument must be a non-empty string")
		} 

		Preclosing:Preclosing{}

		Preclosing.EmiRemaining, err = strconv.Atoi(args[0])
		if err != nil {
			return shim.Error("Failed to get EmiRemaining as cannot convert it to int")
		}
		 
		Preclosing.PenaltyForPreclosure  err = strconv.Atoi(args[1])
		if err != nil {
			return shim.Error("Failed to get PenaltyForPreclosure as cannot convert it to int")
		}
	
		Preclosing.InstallmentPerMonth  err = strconv.Atoi(args[3])
		if err != nil {
			return shim.Error("Failed to get InstallmentPerMonth as cannot convert it to int")
		}
	
		Preclosing.DocumentForClosing =args[3]
		fmt.Println("DocumentForClosing", DocumentForClosing)
	
		Preclosing.PaymentMode =args[4]
		fmt.Println("PaymentMode", PaymentMode)
	
		DocumentsAsBytes, err := stub.GetState("getPreclosing")
		if err != nil {
			return shim.Error("Failed to get Preclosing")
		}
	
	
	}
	func (s *SmartContract)CompanyDetails(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
		
			if len(args) != 5 {
				return shim.Error("Incorrect number of arguments. Expecting 5 ")
			}
			fmt.println("Enter Company Details");
			if len(args[0])<= 0{
				return shim.Error("1st argument must be a non-empty string")
			}
			if len(args[1]) <= 0 {
				return shim.Error("2st argument must be a non-empty string")
			}
			if len(args[2]) <= 0 {
				return shim.Error("3rd argument must be a non-empty string")
			} 
			
			if len(args[2]) <= 0 {
				return shim.Error("3rd argument must be a non-empty string")
			} 
	
			if len(args[2]) <= 0 {
				return shim.Error("3rd argument must be a non-empty string")
			} 
	
			CompanyDetails:CompanyDetails{}

			CompanyDetails.EmploymentType =args[0]
			fmt.Println("EmploymentType", EmploymentType)
		
			CompanyDetails.CompanyName =args[1]
			fmt.Println("CompanyName", CompanyName)
			
			CompanyDetails.JoiningDate  err = strconv.Atoi(args[2])
			if err != nil {
				return shim.Error("Failed to get JoiningDate as cannot convert it to int")
			}
			 
			CompanyDetails.FixedSalary  err = strconv.Atoi(args[3])
			if err != nil {
				return shim.Error("Failed to get FixedSalary as cannot convert it to int")
			}
		
			CompanyDetails.RetiredAge  err = strconv.Atoi(args[4])
			if err != nil {
				return shim.Error("Failed to get RetiredAge as cannot convert it to int")
			}
		
			
		
			CompanyDetailsAsBytes, err := stub.GetState("getCompanyDetails")
			if err != nil {
				return shim.Error("Failed to get CompanyDetails")
			}
		
		
		}
	
	


	
// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
