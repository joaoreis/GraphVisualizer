export default class BubbleSort {
    constructor(data) {
        this.data = data;
        this.i = 0;
        this.j = 0;
    }

    next() {
        if (this.i < this.data.length - 1) {
            if (this.j < this.data.length - 1 - this.i) {
                if (this.data[this.j] > this.data[this.j + 1]) {
                    let temp = this.data[this.j];
                    this.data[this.j] = this.data[this.j + 1];
                    this.data[this.j + 1] = temp;
                }
                this.j++;
            } else {
                this.i++;
                this.j = 0;
            }
            return true;
        } else {
            return false;
        }
    }

    getI() {
        return this.i;
    }

    getJ() {
        return this.j;
    }

    getData() {
        return this.data;
    }
}
