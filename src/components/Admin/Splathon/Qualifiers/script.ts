import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi, RankingApi, ResultApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';

@Component({})
export default class Qualifiers extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;
}
