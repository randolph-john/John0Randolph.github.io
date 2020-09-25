/*                            Class constants                              */
// array of articles to put in
// Each entry is [name, percent, description, link]
var articles = [
  ["Medicare", .168, "Health insurance for 44 million americans who are over 65 or have disabilities or ALS", "https://www.medicare.gov/Pubs/pdf/11306-Medicare-Medicaid.pdf", "medicare"],
  ["Social Security", .1579, "Guaranteed payout for all Americans over 65", "https://www.cbpp.org/research/social-security/policy-basics-top-ten-facts-about-social-security", "ss"],
  ["Defense", .1537, "The Army, Marine Corps, Navy, Air Force, and Space Force", "https://www.thebalance.com/u-s-military-budget-components-challenges-growth-3306320", "tank"],
  ["Medicaid", .105, "Medicaid subsidies to states, who pay the other 40 percent", "https://www.caring.com/caregivers/medicaid/", "doctor"],
  ["Interest", .0845, "Interest payments on the $24 Trillion national debt", "https://www.investopedia.com/updates/usa-national-debt/", "debt"],
  ["Income Security", .0821, "Federal retirement, food and nutrition assistance, housing assistance, unemployment, etc", "https://budget.house.gov/focus-function-600-income-security-0#:~:text=Function%20600%20(Income%20Security)%20consists,assistance%3B%20nutrition%20assistance%3B%20and%20other", "income"],
  ["General Government Expenses", .0581, "IRS refunds, Treasury, legislative functions, etc", "https://home.treasury.gov/about/general-information/role-of-the-treasury", "capitol"],
  ["Veteran's Benefits", .0313, "Income security, hospital care, job training, housing for those who worked in the military", "https://www.military.com/benefits/veteran-benefits/veterans-benefits-explained.html", "benefits"],
  ["Education", .0224*(1-.1409), "Elementary, secondary, vocational, and higher education, as well as research and education aids", "https://www.usnews.com/news/blogs/data-mine/2016/01/14/federal-education-funding-where-does-the-money-go", "teacher"],
  ["International Affairs", .0186, "Internalional diplomacy, the Peace Corps, and other US international interests", "https://www.fp4america.org/international-affairs-budget#:~:text=The%20International%20Affairs%20Budget%20(IAB,)%2C%20and%20the%20Peace%20Corps.&text=They%20also%20protect%20American%20national%20security.", "globe"],
  ["Transportation", .0173, "Roads, airlines, railways, and regulations", "http://www.allgov.com/departments/department-of-transportation?detailsDepartmentID=578#:~:text=The%20Department%20of%20Transportation%20(DOT)%20is%20the%20federal%20government's%20lead,air%20corridors%2C%20railways%20and%20seaports.", "train"],
  ["Law Enforcement", .0118, "Federal law enforcement, litigation, and prisons.", "https://www.federallawenforcement.org/what-is-federal-law-enforcement/", "law"],
  ["Natural Resources and Environment", .0105, "Water engineering, pollution control, land conservation, etc", "https://budget.house.gov/focus-function-300-natural-resources-and-environment-0", "sapling"],
  ["Regional Development", .0088, "Distater relief and rural subsidies", "https://budget.house.gov/focus-function-450-community-and-regional-development-0", "shovel"],
  ["Commerce and Housing Credits", .0076, "Earned income tax credit, loans and insurance for housing and urban development, etc", "https://budget.house.gov/focus-function-370-commerce-and-housing-credit-0", "refund"],
  ["Agricultural Subsidies", .0059, "Subsidies to farmers that protect against low yield years to stabilize the market and enhance national security", "https://usafacts.org/articles/federal-farm-subsidies-what-data-says/", "farm"],
  ["Space Tech and Science", .0056, "NASA, National Institute of Health, National Science Foundation, various grants, and more", "https://www.sciencemag.org/news/2017/05/how-science-fares-us-budget-deal", "astronaut"],
  ["Energy", .0035, "infrastructure and utilites, primarily to rural areas. Also regulation and emergency preparedness", "http://www.allgov.com/departments/department-of-energy?detailsDepartmentID=565", "plug"],
  ["Social Services", .0224*.1409, "Assistance and programs for disabled people, seniors, homeless, and low income people run by 680,000 social workers. Child support, foster care, and more.", "https://www.rasmussen.edu/degrees/health-sciences/blog/what-is-social-services/", "baby"],
];
var tax_rates = [0, .1, .12, .22, .24, .32, .35, .37];
var type_1_brackets = [0, 9700, 39475, 84200, 160725, 204100, 510300];
var type_2_brackets = type_1_brackets.map(function(i) {return i*2});
var type_3_brackets = [0, 13850, 52850, 84200, 160700, 204100, 510300];


/*                            Helper functions                              */
// takes in a string, outputs a float of the number
function parseMoney(payment) {
  if (payment.charAt(0) == '$') {
    payment = user_input.substring(1,payment.length);
  }
  return parseFloat(payment.replace('\,', ''));
}


const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})


function getHTML(payment) {
  html = "";
  first = false;
  html += "<div class=\"inner\" id=\"you-paid\">"
  html += "<h1>In 2019, you paid <span style='color:green'>" + usd.format(payment) + "</span> in federal taxes."
  html += "<br />Here's where that money went.</h1>"
  html += "</div>"

  html += "<section id=\"one\" class=\"tiles\">";
  for (entry of articles) {
    if (!first) {
      html += "<article>"
      html += "</article>"
    }

    html += "<article>"
    html += "<header class=\"major\">"
    html += "<h3><a href=\"#\" class=\"link\">"
    html += "<span style='color:green'>" + usd.format(payment*entry[1]) + " </span> to " + entry[0]
    if (entry.length > 4) {
      html += "<span style=\"text-align:right;\"><img style=\"float:right\" width=\"50\" height=\"50\" src=\"../images/icons/" + entry[4] + ".png\" alt=\"" + entry[4] + "\"></span>"
    }
    html += "</a></h3>"
    if (entry.length > 2) {
      html += "<p>"
      html += entry[2]
      html += "</p>"
    }
    html += "<br />" // for spacing... yikes, I know
    html += "<div class=\"os_poll\" data-path=\"/polls/2665624\" id=\"os-widget-714960\"></div>"
    if (entry.length > 3) {
      html += "<ul class=\"actions\">"
      html += "<li><a href=\"" + entry[3] + "\" target=\"_blank\" class=\"button\">Learn more</a></li>"
      html += "</ul>"
    }
    html += "</header>"
    html += "</article>"
    if (first) {
      html += "<article>"
      html += "<div class=\"os_poll\" data-path=\"/polls/2665624\" id=\"os-widget-714960\"></div>"
      html += "</article>"
    }
    first = !first;
  }
  html += "</section>"

  myScript = document.createElement("script");
  myScript.setAttribute("src", "https://www.benchmarkemail.com/Poll/Start?g=8661&id=1264448&w=220&url=");
  document.body.appendChild(myScript);

  return html;
}


/*                            Main functions                              */
function onEnterTaxNumber(payment) {
  // TODO: shade enter button if unentered
  user_input = document.getElementById("tax-entry").value;
  val = parseMoney(user_input)
  if (isNaN(val)) {
    return;
  }

  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.onload = function() {
  //     callFunctionFromScript();
  // }
  // script.src = 'path/to/your-script.js';
  //
  // <script type="text/javascript">
  // (function(d,s,id,u){
  //   if (d.getElementById(id)) return;
  //   var js, sjs = d.getElementsByTagName(s)[0],
  //       t = Math.floor(new Date().getTime() / 1000000);
  //   js=d.createElement(s); js.id=id; js.async=1; js.src=u+'?'+t;
  //   sjs.parentNode.insertBefore(js, sjs);
  // }(document, 'script', 'os-widget-jssdk', 'https://www.opinionstage.com/assets/loader.js'));
  // </script><div class="os_poll" data-path="/polls/2665624" id="os-widget-714960"></div>


  document.getElementById("main").innerHTML = getHTML(val);
  document.getElementById("idk").innerHTML = "";
  document.getElementById("how-file").innerHTML = "";
  document.getElementById("you-probably-paid").innerHTML = "";
}


function onIDontKnow() {

  html = "";
  html = "<div class=\"inner\">"
  html += "<h1>How much money did you make in 2019?</h1>"

  html += "<form method=\"post\" action=\"#\" onsubmit=\"return false;\">"
  html += "<div class=\"col-12-xlarge\">"
  html += "<input type=\"text\" name=\"demo-name\" id=\"salary-entry\" value=\"\" placeholder=\"$59,039\" />"
  html += "</div>"
  html += "</form>"

  html += "<ul class=\"actions\">"
  html += "<li><a href=\"#filing\" id=\"enter-tax\" class=\"button large next scrolly\" onclick=\'onSalary();\'>Enter</a></li>"
  html += "</ul>"

  html += "</div>"

  document.getElementById("add-script").innerHTML = "<script src=\"salary-enter.js\"></script>"
  document.getElementById("idk").innerHTML = html
  document.getElementById("main").innerHTML = ""
  if (document.getElementById("you-paid") !== null) {
    document.getElementById("you-paid").innerHTML = ""
  }
}


function onSalary() {
  user_input = document.getElementById("salary-entry").value;
  val = parseMoney(user_input)
  if (isNaN(val)) {
    return;
  }

  html = "";
  html = "<div class=\"inner\" id=\"how-file\">"
  html += "<h1>How did you file your taxes in 2019?</h1>"

  html += "<ul class=\"actions\">"
  html += "<li><a href=\"#paid\" class=\"button large\" onclick =\'onFiling(" + val + ", 1);\'>Single</a></li>"
  html += "<li><a href=\"#paid\" class=\"button primary large\" onclick =\'onFiling(" + val + ", 1);\'>Married filing seperately</a></li>"
  html += "</ul>"
  html += "<ul class=\"actions\">"
  html += "<li><a href=\"#paid\" class=\"button large\" onclick =\'onFiling(" + val + ", 2);\'>Married filing jointly</a></li>"
  html += "<li><a href=\"#paid\" class=\"button primary large\" onclick =\'onFiling(" + val + ", 3);\'>Head of household</a></li>"
  html += "</ul>"

  html += "</div>"

  document.getElementById("filing").innerHTML = html;
}


function calculateAmountPaid(amount, type) {
  // type 1 is sinlge or married seperately
  // type 2 is married filing jointly
  // type 3 is head of household

  if (type == 1) {
    brackets = type_1_brackets;
  } else if (type == 2) {
    brackets = type_2_brackets;
  } else {
    brackets = type_3_brackets;
  }

  total_taxes = 0.0;

  for (i = 1; i < brackets.length; i++) {
    bracket = brackets[i]-brackets[i-1];
    if (amount >= bracket) {
      total_taxes += bracket * tax_rates[i];
      amount -= bracket;
    } else {
      total_taxes += amount * tax_rates[i];
      amount -= amount;
      i = brackets.length;
    }
  }
  // rest is taxed at highest rate
  if (amount > 0.0) {
    total_taxes += amount * tax_rates[tax_rates.length - 1];
  }

  return total_taxes;
}


function onFiling(amount, type) {
  paid = calculateAmountPaid(amount, type);

  html = "";
  html += "<div class=\"inner\" id=\"you-probably-paid\">";
  html += "<h1>You probably paid <span style='color:green'>" + usd.format(paid) + "</span> in federal taxes in 2019.</h1>";
  html += "<ul class=\"actions\">";
  html += "<li><a href=\"#banner\" class=\"button large next scrolly\" onclick=\'onTaxPaid(" + paid + ");\'>Okay</a></li>";
  html += "</ul>";

  html += "</div>";

  document.getElementById("paid").innerHTML = html;
}


function onTaxPaid(amount) {
  document.getElementById("idk").innerHTML = "";
  document.getElementById("filing").innerHTML = "";
  document.getElementById("paid").innerHTML = "";
  document.getElementById("tax-entry").innerHTML = usd.format(amount);
  document.getElementById("tax-entry").value = usd.format(amount);
}

function hideShowSources() {
  element = document.getElementById("sources");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
