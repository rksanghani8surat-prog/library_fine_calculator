function calculateFineBill() {
    const lateDays = Number(document.getElementById("lateDays").value);
    const bookCount = Number(document.getElementById("bookCount").value);
    const memberType = document.getElementById("memberType").value;

    if (!Number.isInteger(lateDays) || lateDays < 0 || lateDays > 10 ||
        !Number.isInteger(bookCount) || bookCount < 1 || bookCount > 5) {
        document.getElementById("result").textContent = "Please enter late days from 0 to 10 and a book count from 1 to 5, using whole numbers.";
        document.getElementById("breakdown").textContent = "Correct the input values and calculate again.";
        return;
    }

    const rate = chooseRate(memberType);
    const basicFine = calculateFine(lateDays, bookCount, rate);
    const processingCharge = 10;
    const total = calculateTotal(basicFine, processingCharge);
    document.getElementById("result").textContent = "Rate: ₹" + rate + " per day per book | Basic fine: ₹" + basicFine + " | Processing charge: ₹" + (basicFine > 0 ? processingCharge : 0) + " | Total: ₹" + total;
    document.getElementById("breakdown").textContent = buildBreakdown(lateDays, bookCount, rate);
}

function calculateFine(days, books, rate) {
    return days * books * rate;
}

function chooseRate(type) {
    if (type === "Student") {
        return 5;
    } else if (type === "Staff") {
        return 3;
    } else {
        return 10;
    }
}

function calculateTotal(fine, processingCharge) {
    if (fine <= 0) {
        return 0;
    } else {
        return fine + processingCharge;
    }
}

function buildBreakdown(days, books, rate) {
    if (days === 0) {
        return "No late days. Basic fine: ₹0
Total: ₹0";
    }
    let summary = "Cumulative fine by late day (" + books + " book(s), ₹" + rate + " per day per book):\n";
    for (let day = 1; day <= days; day++) {
        const cumulativeFine = calculateFine(day, books, rate);
        summary += "Day " + day + ": ₹" + cumulativeFine + "\n";
    }
    summary += "\nBasic fine: ₹" + calculateFine(days, books, rate);
    summary += "\nProcessing charge: ₹" + (days > 0 ? 10 : 0);
    summary += "\nTotal: ₹" + calculateTotal(calculateFine(days, books, rate), 10);
    return summary;
}
