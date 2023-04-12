export default class MergeSort {
    constructor(data) {
        this.data = data.slice();
        this.left = 0;
        this.right = data.length - 1;
        this.sorted = false;
        this.m = 1;
        this.i = 0;
        this.j = 0;
        this.temp = new Array(this.data.length);
    }

    merge(left, middle, right) {
        let i = left;
        let j = middle + 1;
        let k = 0;

        while (i <= middle && j <= right) {
            if (this.data[i] < this.data[j]) {
                this.temp[k] = this.data[i];
                i++;
            } else {
                this.temp[k] = this.data[j];
                j++;
            }
            k++;
        }

        while (i <= middle) {
            this.temp[k] = this.data[i];
            i++;
            k++;
        }

        while (j <= right) {
            this.temp[k] = this.data[j];
            j++;
            k++;
        }

        for (let i = 0; i < k; i++) {
            this.data[left + i] = this.temp[i];
        }
    }

    next() {
        if (this.sorted) {
            return false;
        }

        if (this.m <= this.right - this.left) {
            for (let i = this.left; i <= this.right; i += 2 * this.m) {
                const left = i;
                const middle = Math.min(i + this.m - 1, this.right);
                const right = Math.min(i + 2 * this.m - 1, this.right);

                this.merge(left, middle, right);
            }

            this.m *= 2;
            this.i = 0;
            this.j = 0;
        } else {
            this.sorted = true;
        }

        return true;
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

    isSorted() {
        for (let i = this.left; i < this.right; i++) {
            if (this.data[i] > this.data[i + 1]) {
                return false;
            }
        }
        return true;
    }
}
