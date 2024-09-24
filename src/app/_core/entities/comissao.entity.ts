export class Comissao {
  constructor(
    public iParceiroID: number,
    public iFranquiaID: number,
    public nPercentualComissao: number,
    public dtDataHora?: Date,
    public iComissaoID?: number
  ) {}
}
