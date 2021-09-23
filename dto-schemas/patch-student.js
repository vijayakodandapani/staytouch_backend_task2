/* eslint-disable max-lines */
const patchStudent = {
    title: 'Patch Order form',
    description: 'Defines the structure for HTTP POST request body',
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: 'userId',
        format: 'uuid',
      },
      updatedBy: {
        type: 'string',
        format: 'uuid',
      },
      publicId: {
        type: 'string',
        format: 'uuid',
      },
      basicInfo: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            maxLength: 255,
            minLength: 2,
          },
          firstName: {
            type: 'string',
            description: 'firstName',
            maxLength: 255,
            minLength: 2,
          },
          middleName: {
            type: 'string',
            description: 'middleName',
            maxLength: 255,
            minLength: 2,
          },
          lastName: {
            type: 'string',
            description: 'lastName',
            maxLength: 255,
            minLength: 2,
          },
          mobileNumber: {
            type: 'string',
            description: 'mobile number',
          },
          dob: {
            type: 'string',
            description: 'date of birth',
            oneOf: [
              {
                format: 'date-time',
              },
              {
                format: 'date',
              },
            ],
          },
          primaryEmail: {
            type: 'string',
            format: 'email',
            description: 'email',
          },
          gender: {
            type: 'string',
            description: 'gender',
            enum: [ 'male', 'female', 'other' ],
          },
          maritalStatus: {
            type: 'string',
            description: 'marital status',
            enum: [ 'single', 'married', 'widowed', 'divorced', 'separated', 'registered-partnership' ],
          },
          title: {
            type: 'string',
            description: 'title',
          },
          employmentType: {
            type: 'string',
            description: 'employment type',
            enum: [ 'salaried', 'self-employed' ],
          },
          fatherName: {
            type: 'string',
            maxLength: 255,
            minLength: 2,
          },
          motherName: {
            type: 'string',
            maxLength: 255,
            minLength: 2,
          },
          secondaryEmail: {
            type: 'string',
            format: 'email',
            description: 'email',
          },
          panNumber: {
            type: 'string',
            pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
            maxLength: 10,
          },
          religion: {
            type: 'string',
            enum: [ 'Christianity', 'Judaism', 'Hinduism', 'Buddhism', 'Islam', 'Myth', 'Daoism', 'Mesopotamian', 'Sikhism', 'Jainism', 'Other',
              'christianity', 'judaism', 'hinduism', 'buddhism', 'islam', 'myth', 'daoism', 'mesopotamian', 'sikhism', 'jainism', 'other' ],
          },
          category: {
            type: 'string',
            enum: [ 'General', 'SC', 'ST', 'OBC', 'Other', 'other', 'general', 'sc', 'st', 'obc' ],
          },
          familyIncome: {
            type: 'string',
          },
        },
      },
      identityInfo: {
        type: 'object',
        properties: {
          panNumber: {
            type: 'string',
            pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
            maxLength: 10,
          },
          aadharCardNumber: {
            type: 'string',
            pattern: '^[6-9]{1}[0-9]{11}$',
            maxLength: 12,
          },
          drivingLicenceNumber: {
            type: 'string',
          },
          voterCardNumber: {
            type: 'string',
          },
          passportNumber: {
            type: 'string',
            pattern: '^[a-zA-Z]{2}[0-9]{7}$',
            maxLength: 9,
          },
        },
      },
      salaryInfo: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            monthYear: {
              type: 'string',
              description: 'dmonthYear',
            },
            amount: {
              type: 'number',
            },
          },
        },
      },
      financialInfo: {
        type: 'object',
        properties: {
        },
      },
      registrationNumber: {
        type: 'string',
        description: 'registrationNumber',
      },
      engineNumber: {
        type: 'string',
        description: 'engineNumber',
      },
      chassisNumber: {
        type: 'string',
        description: 'chassisNumber',
      },
      previousPolicyInfo: {
        type: 'object',
        properties: {
          insurer: {
            type: 'integer',
            description: 'policyInsurer',
          },
          number: {
            type: 'integer',
            description: 'policyNumber',
          },
          startDate: {
            type: 'string',
            description: 'YYYY-MM-DD format.',
            format: 'date',
          },
          endDate: {
            type: 'string',
            description: 'YYYY-MM-DD format.',
            format: 'date',
          },
        },
      },
      policyInfo: {
        type: 'object',
        properties: {
          policyName: {
            type: 'string',
            description: 'policyName',
          },
          orderNumber: {
            type: 'string',
            description: 'orderNumber',
          },
          proposalId: {
            type: 'string',
            description: 'proposalId',
          },
          premium: {
            type: 'number',
            description: 'premium',
          },
          personalProtectCover: {
            type: 'number',
            description: 'personalProtectCover',
          },
          roadSideAssistant: {
            type: 'number',
            description: 'roadSideAssistant',
          },
          gst: {
            type: 'number',
            description: 'gst',
          },
          name: {
            type: 'string',
            maxLength: 255,
            minLength: 2,
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'email',
          },
          mobileNumber: {
            type: 'string',
            description: 'Mobile number for registration',
            pattern: '^[1-9]{1}[0-9]{9}',
            maxLength: 10,
          },
        },
      },
      claimInPast: {
        type: 'string',
        enum: [ 'yes', 'no', 'notsure' ],
      },
      previousClaimBounus: {
        type: 'string',
      },
      fuelType: {
        type: 'string',
        description: 'fuel type',
        enum: [ 'petrol', 'diesel', 'electric' ],
      },
      coverageType: {
        type: 'string',
        description: 'coverage type',
        enum: [ 'comprehensive', 'third-party' ],
      },
      planType: {
        type: 'string',
        description: 'plan type',
        enum: [ 'comprehensive', 'third-party', 'own-damge-only', 'all' ],
      },
      rtoPincode: { type: 'string' },
      insuredAmount: { type: 'number' },
      loanTenure: { type: 'integer' },
      currentAddress: {
        type: 'object',
        properties: {
          ownership: {
            type: 'string',
            description: 'ownership',
            enum: [ 'owned-by-self/spouse',
              'owned-by-parent/sibling',
              'rented-staying-alone',
              'rented-with-family',
              'rented-with-friends',
              'company-provided',
              'hostel',
              'leased',
              'paying-guest',
              'bachelor-rented-accommodation',
              'mortgage',
              'others' ],
          },
          addressType: {
            type: 'string',
            const: 'current',
          },
          addressLine1: {
            type: 'string',
            maxLength: 30,
          },
          addressLine2: {
            type: 'string',
            maxLength: 30,
          },
          addressLine3: {
            type: 'string',
            maxLength: 30,
          },
          landmark: {
            type: 'string',
            maxLength: 50,
          },
          telephoneNumber: {
            type: 'string',
            maxLength: 10,
          },
          mobileNumber: {
            type: 'string',
            description: 'Mobile number for registration',
            pattern: '^[1-9]{1}[0-9]{9}',
            maxLength: 10,
          },
          stayingSince: {
            type: 'string',
            description: 'YYYY-MM-DD format.',
            oneOf: [
              {
                format: 'date-time',
                formatMinimum: '1751-12-25',
              },
              {
                format: 'date',
                formatMinimum: '1751-12-25',
              },
            ],
          },
          pincode: {
            type: 'string',
            description: 'pincode.',
            pattern: '^[1-9]{1}[0-9]{5}',
            maxLength: 6,
          },
          state: {
            type: 'object',
            properties: {
              publicId: {
                type: 'string',
                format: 'uuid',
              },
              name: {
                type: 'string',
              },
              code: {
                type: 'string',
              },
            },
          },
          stateId: {
            type: 'string',
            format: 'uuid',
          },
          districtName: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
        },
      },
      officeAddress: {
        type: 'object',
        properties: {
          ownership: {
            type: 'string',
            description: 'ownership',
            enum: [ 'owned-by-self/spouse',
              'owned-by-parent/sibling',
              'rented-staying-alone',
              'rented-with-family',
              'rented-with-friends',
              'company-provided',
              'hostel',
              'leased',
              'paying-guest',
              'bachelor-rented-accommodation',
              'mortgage',
              'others' ],
          },
          addressType: {
            type: 'string',
            enum: [ 'current', 'permanent', 'business', 'office' ],
          },
          addressLine1: {
            type: 'string',
            maxLength: 30,
          },
          addressLine2: {
            type: 'string',
            maxLength: 30,
          },
          addressLine3: {
            type: 'string',
            maxLength: 30,
          },
          landmark: {
            type: 'string',
            maxLength: 50,
          },
          telephoneNumber: {
            type: 'string',
            maxLength: 10,
          },
          mobileNumber: {
            type: 'string',
            description: 'Mobile number for registration',
            pattern: '^[1-9]{1}[0-9]{9}',
            maxLength: 10,
          },
          stayingSince: {
            type: 'string',
            description: 'YYYY-MM-DD format.',
            oneOf: [
              {
                format: 'date-time',
                formatMinimum: '1751-12-25',
              },
              {
                format: 'date',
                formatMinimum: '1751-12-25',
              },
            ],
          },
          pincode: {
            type: 'string',
            description: 'pincode.',
            pattern: '^[1-9]{1}[0-9]{5}',
            maxLength: 6,
          },
          state: {
            type: 'object',
            properties: {
              publicId: {
                type: 'string',
                format: 'uuid',
              },
              name: {
                type: 'string',
              },
              code: {
                type: 'string',
              },
            },
          },
          stateId: {
            type: 'string',
            format: 'uuid',
          },
          districtName: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
        },
      },
      permanentAddress: {
        type: 'object',
        properties: {
          ownership: {
            type: 'string',
            description: 'ownership',
            enum: [ 'owned-by-self/spouse',
              'owned-by-parent/sibling',
              'rented-staying-alone',
              'rented-with-family',
              'rented-with-friends',
              'company-provided',
              'hostel',
              'leased',
              'paying-guest',
              'bachelor-rented-accommodation',
              'mortgage',
              'others' ],
          },
          addressType: {
            type: 'string',
            enum: [ 'current', 'permanent', 'business', 'office' ],
          },
          addressLine1: {
            type: 'string',
            maxLength: 30,
          },
          addressLine2: {
            type: 'string',
            maxLength: 30,
          },
          addressLine3: {
            type: 'string',
            maxLength: 30,
          },
          landmark: {
            type: 'string',
            maxLength: 50,
          },
          telephoneNumber: {
            type: 'string',
            maxLength: 10,
          },
          mobileNumber: {
            type: 'string',
            description: 'Mobile number for registration',
            pattern: '^[1-9]{1}[0-9]{9}',
            maxLength: 10,
          },
          stayingSince: {
            type: 'string',
            description: 'YYYY-MM-DD format.',
            oneOf: [
              {
                format: 'date-time',
                formatMinimum: '1751-12-25',
              },
              {
                format: 'date',
                formatMinimum: '1751-12-25',
              },
            ],
          },
          pincode: {
            type: 'string',
            description: 'pincode.',
            pattern: '^[1-9]{1}[0-9]{5}',
            maxLength: 6,
          },
          state: {
            type: 'object',
            properties: {
              publicId: {
                type: 'string',
                format: 'uuid',
              },
              name: {
                type: 'string',
              },
              code: {
                type: 'string',
              },
            },
          },
          stateId: {
            type: 'string',
            format: 'uuid',
          },
          districtName: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
        },
      },
      typeOfBusiness: {
        type: 'string',
        description: 'fuel type',
        enum: [ 'new', 'used', 'rollover' ],
      },
      netPremiumAmount: { type: 'number' },
      totalPremiumAmount: { type: 'number' },
      taxAmount: { type: 'number' },
      uniqueRequestID: { type: 'string' },
      buyingDate: { type: 'string', format: 'date' },
    },
    required: [ 'publicId' ],
    errorMessage: {
      required: {
        publicId: 'Parameter: publicId is required in the body.',
      },
      properties: {
        publicId: 'Parameter: publicId should be valid.',
      },
    },
    additionalProperties: false,
  };
  
  module.exports = patchStudent;
  