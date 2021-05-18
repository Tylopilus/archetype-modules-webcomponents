import { g as getRenderingRef, f as forceUpdate, r as registerInstance, h, H as Host } from './p-506c8de4.js';

const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = ({ on }) => {
    const elmsToUpdate = new Map();
    if (typeof getRenderingRef === 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        on('dispose', () => {
            elmsToUpdate.clear();
        });
        on('get', (propName) => {
            const elm = getRenderingRef();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        });
        on('set', (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(forceUpdate));
            }
            cleanupElements(elmsToUpdate);
        });
        on('reset', () => {
            elmsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
            cleanupElements(elmsToUpdate);
        });
    }
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => subscriptions.forEach((subscription) => {
        if (subscription.set) {
            on('set', subscription.set);
        }
        if (subscription.get) {
            on('get', subscription.get);
        }
        if (subscription.reset) {
            on('reset', subscription.reset);
        }
    });
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    stencilSubscription(map);
    return map;
};

const { state, onChange } = createStore({
  input: '',
});
onChange('input', value => {
  state.input = value;
});

const myInputCss = ":host{display:block}";

const MyInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.handleChange = event => {
      this.text = event.target.value;
      state.input = this.text;
    };
    this.handleClick = () => {
      this.text = '';
    };
    this.loadState = () => {
      this.text = state.input;
    };
  }
  render() {
    return (h(Host, null, h("input", { type: "text", value: this.text, onInput: this.handleChange }), h("button", { onClick: this.handleClick }, "clear"), h("button", { onClick: this.loadState }, "load")));
  }
};
MyInput.style = myInputCss;

const myTictactoeCss = ":host{display:block}.board{width:80%;margin:0 auto}table{width:100%;font-size:12rem}td{text-align:center;border:1px solid black;width:1em;height:1.2em}.winner{font-weight:bolder;font-size:2rem}";

const MyTictactoe = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.board = undefined;
    this.winner = undefined;
    this.gameOver = false;
    this.moves = 0;
    this.turn = 'X';
    this.isEmpty = (board, row, col) => {
      return board[row][col] === '';
    };
    this.setWinner = (winner) => {
      this.winner = winner;
    };
    this.resetBoard = () => {
      this.board = this.updateBoard(undefined);
      this.winner = undefined;
      this.turn = 'X';
      this.moves = 0;
      this.gameOver = false;
    };
    this.checkWinner = () => {
      let winner = undefined;
      for (let row = 0; row < 3; row++) {
        if (this.board[row][0] === this.board[row][1] && this.board[row][0] === this.board[row][2] && this.board[row][0]) {
          winner = this.board[row][0];
        }
      }
      for (let col = 0; col < 3; col++) {
        if (this.board[0][col] === this.board[1][col] && this.board[0][col] === this.board[2][col] && this.board[0][col]) {
          winner = this.board[0][col];
        }
      }
      if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
        winner = this.board[0][0];
      }
      if (this.board[2][0] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
        winner = this.board[2][0];
      }
      if (this.moves === 9)
        winner = 'draw';
      return winner;
    };
    this.updateBoard = (board, movePosRow, movePosCol) => {
      if (!board) {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
      if (movePosRow !== undefined && movePosCol !== undefined) {
        if (!this.isEmpty(board, movePosRow, movePosCol))
          return;
        this.board[movePosRow][movePosCol] = this.turn;
        this.board = [...this.board];
      }
      const winner = this.checkWinner();
      if (winner) {
        this.setWinner(winner);
        this.gameOver = true;
      }
    };
    this.makeMove = (row, col) => {
      if (this.gameOver)
        return;
      this.moves++;
      this.updateBoard(this.board, row, col);
      this.turn = this.turn === 'X' ? 'O' : 'X';
    };
    this.board = this.updateBoard(this.board);
  }
  render() {
    return (h("div", { class: "board" }, h("button", { onClick: this.resetBoard }, "reset"), this.winner && h("span", { class: "winner" }, "Winner is: ", this.winner), h("table", null, h("tbody", null, this.board.map((row, rowIndex) => (h("tr", null, row.map((col, colIndex) => {
      return h("td", { onClick: () => this.makeMove(rowIndex, colIndex) }, col);
    }))))))));
  }
};
MyTictactoe.style = myTictactoeCss;

const sharedButtonCss = ":host{display:block}";

const SharedButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("div", null, "hi ", this.name, ", ", state.input)));
  }
};
SharedButton.style = sharedButtonCss;

export { MyInput as my_input, MyTictactoe as my_tictactoe, SharedButton as shared_button };
