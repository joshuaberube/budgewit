INSERT into resource_links (resource_title, resource_desc, resource_link, resource_category, user_id)
VALUES 
-- General Resources
('Annual Credit Report', 'AnnualCreditReport.com is a website jointly operated by the three major U.S. credit reporting agencies, Equifax, Experian, and TransUnion. The site was created in order to comply with their obligations under the Fair and Accurate Credit Transactions Act (FACTA) to provide a mechanism for American consumers to receive up to three free credit reports per year.', 'https://www.annualcreditreport.com/', 'Credit Report', $1),
('MyMoney.gov', 'This website is a product of the Congressionally chartered Federal Financial Literacy and Education Commission, which is made up of more than 20 Federal entities that are coordinating and collaborating to strengthen financial capability and increase access to financial services for all Americans. The Commission was established by the Financial Literacy and Education Improvement Act, Title V of the Fair and Accurate Credit Transactions Act of 2003 (P.L. 108-159).', 'https://', 'Credit Report', $1),
('FTC Resource Topics: Credit and Loans', 'Decisions about credit and loans involve lots of factors, including how much money you need, what terms you’re offered, and who is behind the offer. If you are choosing a credit card or wondering whether offers of credit and loans are on the up and up, these tips can help.  The FTC works to prevent fraudulent, deceptive and unfair business practices in the marketplace and to provide information to help consumers spot, stop and avoid them.', 'https://www.mymoney.gov/Pages/default.aspx', 'General Consumer Resources', $1),
('Money Smart', 'The FDIC Money Smart financial education program can help people of all ages enhance their financial skills and create positive banking relationships. Learn here about Money Smart tools and strategies that you can use to teach others, as well as tools you can use to learn on your own. First released in 2001 and regularly updated since then, Money Smart has a long track record of success.', 'https://www.fdic.gov/consumers/consumer/moneysmart/index.html','General Consumer Resources',$1),
('CFPB Consumer Resource Page', 'Financial guides and commonly asked questions from the CFPB.  The Consumer Financial Protection Bureau (CFPB), a U.S. government agency that makes sure banks, lenders, and other financial companies treat you fairly.', 'https://www.consumerfinance.gov/consumer-tools/', 'General Consumer Resources', $1),
('HelpwithMyBank.Gov', 'HelpWithMyBank.gov provides information and assistance for customers of national banks and federal savings associations. We’re here to help!','https://helpwithmybank.gov/', 'General Consumer Resources',$1),
('Benefits.gov', 'Benefits.gov is an online resource to help you find federal benefits you may be eligible for in the United States.', 'https://www.benefits.gov/', 'General Consumer Resources',$1),
-- Student Resources
('Budgeting FAQ from StudentAid.gov','Learn how budgeting can help you manage your finances so you can complete your program of study and earn your certificate or degree.',  'https://studentaid.gov/resources/prepare-for-college/students/budgeting', 'Student Resources', $1),  
('Studentaid.gov Fafsa Guide', 'Click this link to learn about and apply for the Free Application for Federal Student Aid (FAFSA®)','https://studentaid.gov/h/apply-for-aid/fafsa', 'Student Resources', $1),  
('College Board Scholarship Guide','This website contains a college scholarship search tool maintained by The College Board.  The College Board is an American not-for-profit with a mission to promote college-readiness and the college admissions process.','https://bigfuture.collegeboard.org/scholarship-search', 'Student Resources', $1),  
('Accredited Schools Online Guide', 'College Guide For Low Income Students:Low income students face unique financial challenges in college which can make higher education seem out of reach. However, many programs exist to help these students succeed and budget for their education. Learn how universities are supporting low income students and find out more about the opportunities available on- and off-campus.', 'https://www.accreditedschoolsonline.org/resources/low-income-students/', 'Student Resources', $1),  
('College Scholarships and Grants Finding Guide', 'Education Grant Benefits And Opportunities: Unlike student loans, college grants do not require repayment. College grants are just like scholarships with 1 exception: cholarships may be need-based or merit based, whereas most grants are typically need-based. Students must fill out a FASFA to check their elegibility for federal grant programs.','http://www.collegescholarships.org/grants', 'Student Resources', $1),  
--Emergencies
('Emergency Fund','Financial article about what an emergency fund is, how big it should be, and how you should grow it.','https://www.wisebread.com/figuring-the-size-of-your-emergency-fund','Preparing for the Worst',$1),
('Scam Alerts','FTC guide on common scams and how to spot them before it is too late.','https://www.consumer.ftc.gov/features/scam-alerts','Preparing for the Worst', $1), 
('SBA: Covid 19 Resources','Resource Page for the Small Business Association providing links to Covid-19 relief resources for small business,','https://www.sba.gov/page/coronavirus-covid-19-small-business-guidance-loan-resources','Preparing for the Worst', $1),  
('Covid-19 Financial Assistance','Financial article on various resources available for individuals during the Covid-19 Pandemic','https://www.nerdwallet.com/blog/finance/covid-19-financial-assistance/','Preparing for the Worst', $1),  
('HUD Coronavirus Resources','The Department of Housing and Urban Development resource page for rental assistance programs in your state, tips on communicating with your landlord, and information about the eviction moratorium','https://www.hud.gov/coronavirus/renters','Preparing for the Worst', $1),  
--Housing
('Consumerfinance.gov: Owning a Home','Buying a house: Tools and resources for homebuyers','https://www.consumerfinance.gov/owning-a-home/', 'Housing' ,$1),     
('New York Times: Buy or Rent Calculator','The choice between buying a home and renting one is among the biggest financial decisions that many adults make. But the costs of buying are more varied and complicated than for renting, making it hard to tell which is a better deal. To help you answer this question, our calculator takes the most important costs associated with buying a house and computes the equivalent monthly rent.','https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html','Housing', $1),  
('Investopedia: What is a Down Payment?','When you buy a home, one of the biggest up-front expenses is the down payment. Not to be confused with closing costs, the down payment is the portion of the purchase price that you pay up front at closing. Generally, if you put less money down on a home at closing, you’ll pay more in fees and interest over the loan’s lifetime (and vice versa).','https://www.investopedia.com/mortgage/mortgage-guide/down-payment/','Housing',$1),  
('Ask the CFBP: PMI','Private mortgage insurance, also called PMI, is a type of mortgage insurance you might be required to pay for if you have a conventional loan. Like other kinds of mortgage insurance, PMI protects the lender—not you—if you stop making payments on your loan.','https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/', 'Housing', $1),  
--Military and Veterans  
('MilitaryConsumer.gov','Defend yourself against fraud and stay financially secure with tools and resources for servicemembers, veterans and families.','https://www.militaryconsumer.gov/','Military & Veterans', $1),
('Thrift Savings Plan (TSP)','The Thrift Savings Plan (TSP) is a retirement savings plan for Service members that is similar to 401(k) plans offered to private sector employees. In addition to service members, employees covered by the Federal Employees Retirement System (FERS) or the Civil Service Retirement System (CSRS) may also be eligible for TSP. Civilians in certain other categories of federal service including some congressional positions and some justices and judges may also be eligible.','https://www.tsp.gov/account-basics/','Military & Veterans', $1), 
('Department of Defense Office of Financial Readiness','We provide resources, education and support to service members and their families to create a financially secure and mission ready force.','https://finred.usalearning.gov/','Military & Veterans', $1),
('Military Saves','Military Saves, a component of America Saves, and a participant in the Department of Defense Financial Readiness Network seeks to motivate, support, and encourage the entire military community to save money, reduce debt, and build wealth.','https://militarysaves.org/','Military & Veterans', $1),
('U.S. Small Business Administration: Veteran Owned Businesses','The SBA offers support for veterans as they enter the world of business ownership. Look for funding programs, training, and federal contracting opportunities.','https://www.sba.gov/business-guide/grow-your-business/veteran-owned-businesses#section-header-0','Military & Veterans', $1),
--Retirement
('IRS 401k Page','The IRS primer page for explaining a 401k retirement account and how it differs from your other options for tax treatment.','https://www.irs.gov/retirement-plans/401k-plans','Retirement',$1),
('IRS IRA Page','The IRS primer page for explaining Individual Retirement Arrangements and the difference between a traditional and Roth IRA.','https://www.irs.gov/retirement-plans/individual-retirement-arrangements-iras','Retirement',$1),
('AARP: Retirement','It’s Time For A New Conversation About Your Retirement Priorities.','https://www.aarp.org/retirement/planning-for-retirement/','Retirement',$1);