const selectionChangeEvent = new Event("selectionChange");
Object.defineProperty(selectionChangeEvent, "selectionCaret", {
  get: function() {
    return this.target.selectionDirection === "forward"
      ? this.target.selectionEnd
      : this.target.selectionStart;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionCaretX", {
  get: function() {
    return this.target.selectionDirection === "forward"
      ? this.selectionEndX
      : this.selectionStartX;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionCaretY", {
  get: function() {
    return this.target.selectionDirection === "forward"
      ? this.selectionEndY
      : this.selectionStartY;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionIsCaret", {
  get: function() {
    return this.target.selectionStart === this.target.selectionEnd;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionStart", {
  get: function() {
    return this.target.selectionStart;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionStartSol", {
  get: function() {
    const { selectionStart, value } = this.target;
    const valueUntilStart = value.substr(0, selectionStart);
    const maybeSolIndex = valueUntilStart.lastIndexOf("\n");
    const solIndex = maybeSolIndex !== -1 ? maybeSolIndex + 1 : 0;

    return solIndex;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionStartEol", {
  get: function() {
    const { selectionStart, value } = this.target;
    const maybeEolIndex = value.indexOf("\n", selectionStart);
    const eolIndex = maybeEolIndex !== -1 ? maybeEolIndex : value.length - 1;

    return eolIndex;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionStartX", {
  get: function() {
    const { selectionStart, value } = this.target;
    const valueUntilStart = value.substr(0, selectionStart);
    const valueFromStartSol = valueUntilStart.substr(this.selectionStartSol);
    const valueFromStartSolLength = valueFromStartSol.length;

    return valueFromStartSolLength;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionStartY", {
  get: function() {
    const { selectionStart, value } = this.target;
    const valueUntilStart = value.substr(0, selectionStart);
    const linesLengthUntilStart = valueUntilStart.split("\n").length;

    return linesLengthUntilStart - 1;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionEnd", {
  get: function() {
    return this.target.selectionEnd;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionEndX", {
  get: function() {
    const { selectionEnd, value } = this.target;
    const valueUntilEnd = value.substr(0, selectionEnd);
    const maybeSolIndex = valueUntilEnd.lastIndexOf("\n");
    const solIndex = maybeSolIndex !== -1 ? maybeSolIndex + 1 : 0;
    const valueFromEndSol = valueUntilEnd.substr(solIndex);
    const valueFromEndSolLength = valueFromEndSol.length;

    return valueFromEndSolLength;
  }
});

Object.defineProperty(selectionChangeEvent, "selectionEndY", {
  get: function() {
    const { selectionEnd, value } = this.target;
    const valueUntilEnd = value.substr(0, selectionEnd);
    const linesLengthUntilEnd = valueUntilEnd.split("\n").length;

    return linesLengthUntilEnd - 1;
  }
});

export default function addSelectionChangeEvent(element) {
  function triggerSelectionChangeEvent() {
    this.dispatchEvent(selectionChangeEvent);
  }

  element.addEventListener("click", triggerSelectionChangeEvent);
  element.addEventListener("focus", triggerSelectionChangeEvent);
  element.addEventListener("keyup", triggerSelectionChangeEvent);
}
