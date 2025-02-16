//Compute Tax
const computeTax = (businessNature, capitalInvestment, classification) => {
    if (!classification){
    return null;
    }
      const conditions = [
        {//Bank
          category: 'BNK',
          check: (businessNature) => businessNature.startsWith('BNK'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
          // Tax for new businesses
          const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
          return tax;
            }
            if(classification === 'Renew'){
            // Bank-specific tax rules for renew businesses
            if (capitalInvestment <= 1000000) {
              return capitalInvestment * 0.00605; // 60.5% of 1%
            } else {
              return capitalInvestment * 0.005808; // 58.08% of 1%
            }
            }
          },
        },
        {//Contractor
          category: 'CNT',
          check: (businessNature) => businessNature.startsWith('CNT'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              // Tax computation for new businesses in the CNT category
              if (capitalInvestment < 5000) {
                return 33.0;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 10000) {
                return 74.54;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 126.45;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 199.65;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 332.75;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 465.85;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 665.5;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 1064.8;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 1597.2;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 150000) {
                return 2395.8;
              } else if (capitalInvestment >= 150000 && capitalInvestment < 200000) {
                return 3194.4;
              } else if (capitalInvestment >= 200000 && capitalInvestment < 250000) {
                return 4392.3;
              } else if (capitalInvestment >= 250000 && capitalInvestment < 300000) {
                return 5590.2;
              } else if (capitalInvestment >= 300000 && capitalInvestment < 400000) {
                return 7453.6;
              } else if (capitalInvestment >= 400000 && capitalInvestment < 500000) {
                return 9982.5;
              } else if (capitalInvestment >= 500000 && capitalInvestment < 750000) {
                return 11192.5;
              } else if (capitalInvestment >= 750000 && capitalInvestment < 1000000) {
                return 12402.5;
              } else if (capitalInvestment >= 1000000 && capitalInvestment < 2000000) {
                return 13915.0;
              } else if (capitalInvestment >= 2000000) {
                return capitalInvestment * 0.00605; // 60.5% of 1%
              }
            }
    
            
            console.log(`CNT: Classification "${classification}" not matched`);
            return 0; // Default to no tax for other classifications or unmatched conditions
          },
          
        },
        {//Lessor
          category: 'LSS',
          check: (businessNature) => businessNature.startsWith('LSS'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              // Tax computation for new businesses in the LSS category
              if (capitalInvestment < 5000) {
                return 302.50;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 10000) {
                return 363.00;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 20000) {
                return 544.50;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 665.50;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 726.00;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 907.50;
              } else if (capitalInvestment >= 50000) {
                // For every 5,000 in excess of 50,000, add 24.20
                const excess = Math.floor((capitalInvestment - 50000) / 5000);
                return 907.50 + (excess * 24.20);
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          },
        },
        {//Manufacturer Non-Essential
          category: 'MFRP_MILL',
          check: (businessNature) => 
            businessNature.startsWith('MFRP') || businessNature.startsWith('MILL'),
          taxCalculation: (capitalInvestment, classification) => {    
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 10000) {
                return 199.65;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 266.20;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 365.20;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 532.40;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 798.60;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 998.25;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 1597.20;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 1996.50;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 150000) {
                return 2662.00;
              } else if (capitalInvestment >= 150000 && capitalInvestment < 200000) {
                return 3327.50;
              } else if (capitalInvestment >= 200000 && capitalInvestment < 300000) {
                return 4658.50;
              } else if (capitalInvestment >= 300000 && capitalInvestment < 500000) {
                return 6655.00;
              } else if (capitalInvestment >= 500000 && capitalInvestment < 750000) {
                return 9680.00;
              } else if (capitalInvestment >= 750000 && capitalInvestment < 1000000) {
                return 12100.00;
              } else if (capitalInvestment >= 1000000 && capitalInvestment < 2000000) {
                return 16637.50;
              } else if (capitalInvestment >= 2000000 && capitalInvestment < 3000000) {
                return 19965.00;
              } else if (capitalInvestment >= 3000000 && capitalInvestment < 4000000) {
                return 23958.00;
              } else if (capitalInvestment >= 4000000 && capitalInvestment < 5000000) {
                return 27951.00;
              } else if (capitalInvestment >= 5000000 && capitalInvestment < 6500000) {
                return 29493.75;
              } else if (capitalInvestment >= 6500000) {
                return capitalInvestment * 0.0045; // 45% of 1%
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          },
        },
        {//Manufacturer Essential
          category: 'MFRP',
          check: (businessNature) => businessNature.startsWith('MFRP'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 10000) {
                return 99.83;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 133.10;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 182.71;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 266.20;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 399.30;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 499.13;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 798.60;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 998.25;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 150000) {
                return 1331.00;
              } else if (capitalInvestment >= 150000 && capitalInvestment < 200000) {
                return 1663.75;
              } else if (capitalInvestment >= 200000 && capitalInvestment < 300000) {
                return 2329.25;
              } else if (capitalInvestment >= 300000 && capitalInvestment < 500000) {
                return 3327.50;
              } else if (capitalInvestment >= 500000 && capitalInvestment < 750000) {
                return 4840.00;
              } else if (capitalInvestment >= 750000 && capitalInvestment < 1000000) {
                return 6050.00;
              } else if (capitalInvestment >= 1000000 && capitalInvestment < 2000000) {
                return 8318.75;
              } else if (capitalInvestment >= 2000000 && capitalInvestment < 3000000) {
                return 9982.50;
              } else if (capitalInvestment >= 3000000 && capitalInvestment < 4000000) {
                return 11979.00;
              } else if (capitalInvestment >= 4000000 && capitalInvestment < 5000000) {
                return 13915.00;
              } else if (capitalInvestment >= 5000000 && capitalInvestment < 6500000) {
                return 14746.88;
              } else if (capitalInvestment >= 6500000) {
                return 0.2255 * 0.01 * capitalInvestment; // 22.55% of 1% for capital investment greater than or equal to 6,500,000
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },    
        {//Proprietors Amusement Devices
          category: 'PRA',
          check: (businessNature) => businessNature.startsWith('PRA'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 10000) {
                return capitalInvestment * 0.0121; // 1.21%
              } else {
                return capitalInvestment * 0.00605; // 60.50% of 1%
              }
            }
            return 0; // Default to no tax for other classifications
          }
        },
        {//Retailer Tobaco
          category: 'RTLT',
          check: (businessNature) => businessNature.startsWith('RTLT'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 5000) {
                return 33.28;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 10000) {
                return 74.54;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 126.45;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 199.65;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 332.75;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 465.85;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 665.50;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 1064.80;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 1597.20;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 1000000) {
                return capitalInvestment * 0.0121; // 1.21%
              } else if (capitalInvestment >= 1000000) {
                return capitalInvestment * 0.00605; // 60.50% of 1%
              }
            }
            return 0; // Default to no tax for other classifications
          }
        },
        {//Retailer Essential
          category: 'RTLE',
          check: (businessNature) => businessNature.startsWith('RTLE'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 400000) {
                return capitalInvestment * 0.0121; // 1.21%
              } else if (capitalInvestment >= 400000) {
                return capitalInvestment * 0.00605; // 60.50% of 1%
              }
            }
            return 0; // Default to no tax for other classifications
          }
        },
        {//Retailer Liquors
          category: 'RTLL',
          check: (businessNature) => businessNature.startsWith('RTLL'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 5000) {
                return 33.28;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 10000) {
                return 74.54;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 126.45;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 199.65;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 332.75;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 465.85;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 665.50;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 1064.80;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 1597.20;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 1000000) {
                return capitalInvestment * 0.0121; // 1.21%
              } else if (capitalInvestment >= 1000000) {
                return capitalInvestment * 0.00605; // 60.50% of 1%
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Retailer Non-Essential
          category: 'RTLN',
          check: (businessNature) => businessNature.startsWith('RTLN'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment <= 400000) {
                return capitalInvestment * 0.0242; // 2.42% of the capital investment
              } else if (capitalInvestment > 400000) {
                return capitalInvestment * 0.0121; // 1.21% of the capital investment
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Wholesaler Non-Essential
          category: 'WHN',
          check: (businessNature) => businessNature.startsWith('WHN'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 1000) {
                return 21.78;
              } else if (capitalInvestment >= 1000 && capitalInvestment < 2000) {
                return 39.93;
              } else if (capitalInvestment >= 2000 && capitalInvestment < 3000) {
                return 60.50;
              } else if (capitalInvestment >= 3000 && capitalInvestment < 4000) {
                return 87.12;
              } else if (capitalInvestment >= 4000 && capitalInvestment < 5000) {
                return 121.00;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 6000) {
                return 146.21;
              } else if (capitalInvestment >= 6000 && capitalInvestment < 7000) {
                return 173.03;
              } else if (capitalInvestment >= 7000 && capitalInvestment < 8000) {
                return 199.65;
              } else if (capitalInvestment >= 8000 && capitalInvestment < 10000) {
                return 226.27;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 266.20;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 332.75;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 399.30;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 532.40;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 798.60;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 1197.90;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 1597.20;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 150000) {
                return 2262.70;
              } else if (capitalInvestment >= 150000 && capitalInvestment < 200000) {
                return 2928.20;
              } else if (capitalInvestment >= 200000 && capitalInvestment < 300000) {
                return 3993.00;
              } else if (capitalInvestment >= 300000 && capitalInvestment < 500000) {
                return 5324.00;
              } else if (capitalInvestment >= 500000 && capitalInvestment < 750000) {
                return 7986.00;
              } else if (capitalInvestment >= 750000 && capitalInvestment < 1000000) {
                return 10648.00;
              } else if (capitalInvestment >= 1000000 && capitalInvestment < 2000000) {
                return 12100.00;
              } else if (capitalInvestment >= 2000000) {
                return capitalInvestment * 0.00605; // 60.5% of 1%
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Wholesaler Essential
          category: 'WHE',
          check: (businessNature) => businessNature.startsWith('WHE'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 1000) {
                return 10.89;
              } else if (capitalInvestment >= 1000 && capitalInvestment < 2000) {
                return 19.97;
              } else if (capitalInvestment >= 2000 && capitalInvestment < 3000) {
                return 30.25;
              } else if (capitalInvestment >= 3000 && capitalInvestment < 4000) {
                return 43.56;
              } else if (capitalInvestment >= 4000 && capitalInvestment < 5000) {
                return 60.50;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 6000) {
                return 73.21;
              } else if (capitalInvestment >= 6000 && capitalInvestment < 7000) {
                return 86.52;
              } else if (capitalInvestment >= 7000 && capitalInvestment < 8000) {
                return 99.83;
              } else if (capitalInvestment >= 8000 && capitalInvestment < 10000) {
                return 113.10;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 133.10;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 166.38;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 199.65;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 266.20;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 399.30;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 598.95;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 798.60;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 150000) {
                return 1131.35;
              } else if (capitalInvestment >= 150000 && capitalInvestment < 200000) {
                return 1464.10;
              } else if (capitalInvestment >= 200000 && capitalInvestment < 300000) {
                return 1996.50;
              } else if (capitalInvestment >= 300000 && capitalInvestment < 500000) {
                return 2662.00;
              } else if (capitalInvestment >= 500000 && capitalInvestment < 750000) {
                return 3993.00;
              } else if (capitalInvestment >= 750000 && capitalInvestment < 1000000) {
                return 5324.00;
              } else if (capitalInvestment >= 1000000 && capitalInvestment < 2000000) {
                return 6050.00;
              } else if (capitalInvestment >= 2000000) {
                return capitalInvestment * 0.003025; // 30.25% of 1%
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Cockpit Operator
          category: 'OPRC',
          check: (businessNature) => businessNature.startsWith('OPRC'),
          taxCalculation: (classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            // Automatically return tax for OPRC
            if (classification === 'Renew') {
              return 9317;
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Operator - Cockpit - Promoter - Ordinary Operator
          category: 'OPRCPO',
          check: (businessNature) => businessNature.startsWith('OPRCPO'),
          taxCalculation: (classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            // Automatically return tax for OPRCPO
            if (classification === 'Renew') {
              return 12.10;
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Operator - Cockpit - Promoter - Pintakasi / Concierto
              category: 'OPRCP',
              check: (businessNature) => businessNature.startsWith('OPRCPO'),
              taxCalculation: (classification) => {
                if (classification === 'New') {
                  // Tax for new businesses
                  const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
                  return tax;
                    }
                // Automatically return tax for OPRCPO
                if (classification === 'Renew') {
                  return 18.15;
                }
                return 0; // Default to no tax for other classifications or unmatched conditions
              }
        },
        {//Operator - Subdivision
          category: 'ORPS',
          check: (businessNature) => businessNature.startsWith('ORPS'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 50000) {
                return 302.50;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 100000) {
                return 605.00;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 250000) {
                return 847.00;
              } else if (capitalInvestment >= 250000 && capitalInvestment < 500000) {
                return 1089.00;
              } else if (capitalInvestment >= 500000 && capitalInvestment < 1000000) {
                return 1452.00;
              } else if (capitalInvestment >= 1000000) {
                // For every 100,000 in excess of 1,000,000, add 145.20
                let excessAmount = capitalInvestment - 1000000;
                let additionalTax = Math.floor(excessAmount / 100000) * 145.20;
                return 1452.00 + additionalTax;
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Operator - Theaters
          category: 'OPRT',
          check: (businessNature) => businessNature.startsWith('OPRT'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 5000) {
                return 60.50;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 10000) {
                return 90.75;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 15000) {
                return 121.00;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 20000) {
                return 181.50;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 242.00;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 326.70;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 423.50;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 75000) {
                return 484.00;
              } else if (capitalInvestment >= 75000 && capitalInvestment < 100000) {
                return 605.00;
              } else if (capitalInvestment >= 100000 && capitalInvestment < 150000) {
                return 968.00;
              } else if (capitalInvestment >= 150000 && capitalInvestment < 200000) {
                return 1089.00;
              } else if (capitalInvestment >= 200000 && capitalInvestment < 250000) {
                return 1210.00;
              } else if (capitalInvestment >= 250000 && capitalInvestment < 300000) {
                return 2783.00;
              } else if (capitalInvestment >= 300000 && capitalInvestment < 400000) {
                return 3025.00;
              } else if (capitalInvestment >= 400000 && capitalInvestment < 500000) {
                return 3630.00;
              } else if (capitalInvestment >= 500000) {
                // 60.50% of 1% for capital investments greater than or equal to 500,000
                return 0.605 * 0.01 * capitalInvestment;
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Operator Restaurant
          category: 'OPRR',
          check: (businessNature) => businessNature.startsWith('OPRR'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 2000) {
                return 60.50;
              } else if (capitalInvestment >= 2000 && capitalInvestment < 3000) {
                return 84.70;
              } else if (capitalInvestment >= 3000 && capitalInvestment < 4000) {
                return 108.90;
              } else if (capitalInvestment >= 4000 && capitalInvestment < 5000) {
                return 121.00;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 6000) {
                return 133.10;
              } else if (capitalInvestment >= 6000 && capitalInvestment < 7000) {
                return 157.30;
              } else if (capitalInvestment >= 7000 && capitalInvestment < 8000) {
                return 181.50;
              } else if (capitalInvestment >= 8000 && capitalInvestment < 9000) {
                return 211.75;
              } else if (capitalInvestment >= 9000 && capitalInvestment < 10000) {
                return 242.00;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 11000) {
                return 272.25;
              } else if (capitalInvestment >= 11000 && capitalInvestment < 12000) {
                return 302.50;
              } else if (capitalInvestment >= 12000 && capitalInvestment < 13000) {
                return 332.75;
              } else if (capitalInvestment >= 13000 && capitalInvestment < 14000) {
                return 363.00;
              } else if (capitalInvestment >= 14000 && capitalInvestment < 15000) {
                return 393.25;
              } else if (capitalInvestment >= 15000 && capitalInvestment < 17000) {
                return 423.50;
              } else if (capitalInvestment >= 17000 && capitalInvestment < 19000) {
                return 447.70;
              } else if (capitalInvestment >= 19000 && capitalInvestment < 21000) {
                return 459.80;
              } else if (capitalInvestment >= 21000 && capitalInvestment < 23000) {
                return 484.00;
              } else if (capitalInvestment >= 23000 && capitalInvestment < 25000) {
                return 514.25;
              } else if (capitalInvestment >= 25000 && capitalInvestment < 27000) {
                return 544.50;
              } else if (capitalInvestment >= 27000 && capitalInvestment < 29000) {
                return 574.75;
              } else if (capitalInvestment >= 29000 && capitalInvestment < 31000) {
                return 592.90;
              } else if (capitalInvestment >= 31000 && capitalInvestment < 33000) {
                return 635.25;
              } else if (capitalInvestment >= 33000 && capitalInvestment < 35000) {
                return 665.50;
              } else if (capitalInvestment >= 35000 && capitalInvestment < 40000) {
                return 786.50;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 907.50;
              } else if (capitalInvestment >= 50000 && capitalInvestment < 60000) {
                return 1028.50;
              } else if (capitalInvestment >= 60000 && capitalInvestment < 80000) {
                return 1119.25;
              } else if (capitalInvestment >= 80000 && capitalInvestment < 100000) {
                return 1210.00;
              } else if (capitalInvestment >= 100000) {
                // 60.50% of 1% for capital investments greater than or equal to 100,000
                return 0.605 * 0.01 * capitalInvestment;
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Privately Owned Market
          category: 'OPRM',
          check: (businessNature) => businessNature.startsWith('OPRM'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              if (capitalInvestment <= 1000000) {
                return 0.605 * 0.01 * capitalInvestment; // 60.50% of 1% for capital investment of 1,000,000 or less
              } else if (capitalInvestment > 1000000) {
                return 0.583 * 0.01 * capitalInvestment; // 58.30% of 1% for capital investment greater than 1,000,000
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        },
        {//Private Cemeteries
          category: 'OPRPC',
          check: (businessNature) => businessNature.startsWith('OPRPC'),
          taxCalculation: (capitalInvestment, classification) => {
            if (classification === 'New') {
              // Tax for new businesses
              const tax = Math.max(220, capitalInvestment * 0.0005); // 1/20th of 1% of capital investment
              return tax;
                }
            if (classification === 'Renew') {
              if (capitalInvestment < 5000) {
                return 60.50;
              } else if (capitalInvestment >= 5000 && capitalInvestment < 10000) {
                return 90.75;
              } else if (capitalInvestment >= 10000 && capitalInvestment < 20000) {
                return 272.25;
              } else if (capitalInvestment >= 20000 && capitalInvestment < 30000) {
                return 393.25;
              } else if (capitalInvestment >= 30000 && capitalInvestment < 40000) {
                return 514.25;
              } else if (capitalInvestment >= 40000 && capitalInvestment < 50000) {
                return 635.25;
              } else if (capitalInvestment >= 50000) {
                // For every 5,000 in excess of 50,000, PhP 60.50 is added
                const excessAmount = capitalInvestment - 50000;
                const excessTax = Math.floor(excessAmount / 5000) * 60.50;
                return 635.25 + excessTax;
              }
            }
            return 0; // Default to no tax for other classifications or unmatched conditions
          }
        }
      ];
      
    
      for (const condition of conditions) {
        if (condition.check(businessNature)) {
          return condition.taxCalculation(capitalInvestment, classification);
        }
      }
    
      console.warn(`No matching condition found for BusinessNature: ${businessNature}, Classification: ${classification}`);
      return null; // Default case if no conditions match
    };

    module.exports = {computeTax};