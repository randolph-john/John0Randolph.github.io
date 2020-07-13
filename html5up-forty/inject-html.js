/*                            Class constants                              */
// array of articles to put in
// Each entry is [name, percent, description, link]
var articles = [
  ["Medicare", .168, "Health insurance for 44 million americans who are over 65 or have disabilities or ALS", "https://www.medicare.gov/Pubs/pdf/11306-Medicare-Medicaid.pdf"],
  ["Social Security", .158, "Guaranteed payout for all Americans over 65", "https://www.cbpp.org/research/social-security/policy-basics-top-ten-facts-about-social-security"],
  // ["Medicaid", .093, "Health insurance for 64 million americans who are low-income, are or have children, or are pregnant", "https://www.kff.org/medicaid/issue-brief/10-things-to-know-about-medicaid-setting-the-facts-straight/"],
  ["Defense", .153, "The Army, Marine Corps, Navy, Air Force, and Space Force", "https://www.thebalance.com/u-s-military-budget-components-challenges-growth-3306320"],
  ["Medicaid", .105, "Medicaid subsidies to states, who pay the other 40 percent"],
  ["Interest", .085, "Interest payments on the $24 Trillion national debt", "https://www.investopedia.com/updates/usa-national-debt/"],
  ["Income Security", .082, "Federal retirement, food and nutrition assistance, housing assistance, unemployment, etc"],
  ["General Government Expenses", .058, "Various government administration"],
  ["Unreported", .048, "We don't know where this money goes"],
  ["Veteran's Benefits", .031, "Benefits for those who worked in the military"],
  ["Social Services", .003102, "Social services"],
  ["Education", .137989, "Higher education"],
  ["International Affairs", .019, "international affairs"],
  ["Transportation", .017, "transpo"],
  ["Department of Justice", .012, "courts"],
  ["Natural resources and Environment", .01, "water engineering, polluiton control, land conservation, etc"],
  ["Regional development", .009, "distater relief and development"],
  ["Commerce and Housing credits", .008, "credits"],
  ["Agricultural subsidies", .006, "big agro"],
  ["Space Tech and Science", .006, "break this up"],
  ["Energy", .003, "dep of energy"],
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
    html += (first ? "": "<article></article>")

    html += "<article>"
    html += "<header class=\"major\">"
    html += "<h3><a href=\"#\" class=\"link\">"
    html += "<span style='color:green'>" + usd.format(payment*entry[1]) + " </span> to " + entry[0]
    html += "</a></h3>"
    html += "<p>"
    html += entry[2]
    html += "</p>"
    html += "<br />" // for spacing... yikes, I know
    if (entry.length > 3) {
      html += "<ul class=\"actions\">"
      html += "<li><a href=\"" + entry[3] + "\" target=\"_blank\" class=\"button\">Learn more</a></li>"
      html += "</ul>"
    }
    html += "</header>"
    html += "</article>"
    html += (first ? "<article></article>" : "")
    first = !first;
  }
  html += "</section>"
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

  document.getElementById("main").innerHTML = getHTML(val);
}


function onIDontKnow() {

  html = "";
  html = "<div class=\"inner\">"
  html += "<h1>How much money did you make in 2019?</h1>"

  html += "<form method=\"post\" action=\"#\">"
  html += "<div class=\"col-12-xlarge\">"
  html += "<input type=\"text\" name=\"demo-name\" id=\"salary-entry\" value=\"\" placeholder=\"$59,039\" />"
  html += "</div>"
  html += "</form>"

  html += "<ul class=\"actions\">"
  html += "<li><a href=\"#filing\" class=\"button large next scrolly\" onclick=\'onSalary();\'>Enter</a></li>"
  html += "</ul>"

  html += "</div>"

  document.getElementById("idk").innerHTML = html;
  document.getElementById("one").innerHTML = "";
  document.getElementById("you-paid").innerHTML = "";
}


function onSalary() {
  user_input = document.getElementById("salary-entry").value;
  val = parseMoney(user_input)
  if (isNaN(val)) {
    return;
  }

  html = "";
  html = "<div class=\"inner\">"
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
  html += "<div class=\"inner\">";
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
