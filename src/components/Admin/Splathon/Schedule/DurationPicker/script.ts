import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';

@Component({
  components: {},
})
export default class DurationPicker extends Vue {
  @Prop() public value!: number;

  @Emit()
  public input(value: number) {}

  private get minutes(): number {
    return this.value / 60;
  }

  private set minutes(value: number) {
    this.input(value * 60);
  }
}

