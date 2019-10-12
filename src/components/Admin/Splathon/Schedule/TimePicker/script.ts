import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';

@Component({
  components: {},
})
export default class TimePicker extends Vue {
  @Prop() public value!: number;

  @Emit()
  public input(value: number) {}

  private valueDate(): Date {
    return new Date(this.value*1000 || Date.now());
  }

  private emitNew(year: number, month: number, day: number, hour: number, minute: number) {
    try {
      const d = new Date(year, month - 1, day, hour, minute);
      if (d) {
        this.input(d.getTime() / 1000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  private get year(): number {
    return this.valueDate().getFullYear();
  }

  private set year(value: number) {
    if (this.year != value && value > 999) {
      this.emitNew(value, this.month, this.day, this.hour, this.minute);
    }
  }

  private get month(): number {
    return this.valueDate().getMonth() + 1;
  }

  private set month(value: number) {
    if (this.month != value && 1 <= value && value <= 12) {
      this.emitNew(this.year, value, this.day, this.hour, this.minute);
    }
  }

  private get day(): number {
    return this.valueDate().getDate();
  }

  private set day(value: number) {
    if (this.day != value && 1 <= value && value <= 31) {
      this.emitNew(this.year, this.month, value, this.hour, this.minute);
    }
  }

  private get hour(): number {
    return this.valueDate().getHours();
  }

  private set hour(value: number) {
    if (this.hour != value && 0 <= value && value <= 23) {
      this.emitNew(this.year, this.month, this.day, value, this.minute);
    }
  }

  private get minute(): number {
    return this.valueDate().getMinutes();
  }

  private set minute(value: number) {
    if (this.minute != value && 0 <= value && value <= 59) {
      this.emitNew(this.year, this.month, this.day, this.hour, value);
    }
  }
}

