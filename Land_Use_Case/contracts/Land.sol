// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.5.0<0.9.0;

contract LandRegistration {

    struct LandDetail {
        uint    surveyNo    ;
        string  district    ;
        string  taluk       ;
        string  village     ;
        uint    blockNo     ;
        uint    landValue   ; // in wei
        uint    area        ;
        bool    salesStatus ;
    }

    uint public registeredLandCount = 0; // to know the total count of land

    mapping(uint => LandDetail) LandDetails;

    bool salesStatus; // To know the whether the land has been sold or not.

    function registerNewLand(uint surveyNo, string memory district, string memory taluk, string memory village, uint blockNo, uint landValue, uint area) public {
        LandDetails[registeredLandCount] = LandDetail(surveyNo, district, taluk, village, blockNo, landValue, area, false);
        registeredLandCount++;
    }

    function getLandDetails(uint LandId) view public returns(LandDetail memory) {
        return LandDetails[LandId];
    }
}
