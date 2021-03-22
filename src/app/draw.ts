/**
 * Classe contenant toutes les informations d'un résultat de tirage du loto ou de l'euromillions
 */
export class Draw {
  title: string;
  link: string;
  guid: string;
  description: string;
  pubDate: Date;
  numbers: number[] = [0, 0, 0, 0, 0];
  stars: number[] = [0, 0];
  type: string;
  jackpots: {current: number, win: number, next: number};
  matchMyDraws: MyDraw[] = [];

  public match(otherDraw: {numbers: number[], stars: number[]}) {
    return this.equals(this.numbers, otherDraw.numbers) && this.equals(this.stars, otherDraw.stars);
  }

  private equals(array: number[], other: number[]): boolean {
    return (JSON.stringify(array.sort()) === JSON.stringify(other.sort()));
  }
}

/**
 * Classe contenant toutes les informations d'un résultat de tirage du loto ou de l'euromillions
 */
export class MyDraw {
  title: string;
  numbers: number[] = [0, 0, 0, 0, 0];
  stars: number[] = [0, 0];
}

/**
 * Classe statique permettant l'extraction et la converstion en objet Draw de données RSS (XML)
 */
export class DrawParser {

  /**
   * Parse le fichier XML/RSS de la loterie,
   * fichier issue de 'view-source:https://www.lesbonsnumeros.com/rss.xml'
   * @param data le fichier XML recupéré au format texte
   * @param type le type de tirage a récupérer : 'all', 'euromillions' ou 'loto'
   * @returns {Draw[]} un tableau d'objets Draw (Tirage)
   */
  static parse(data: string, type: string = 'all'): Draw[] {

    let drawItems: Draw[] = [];
    let dom = (new DOMParser()).parseFromString(data, "text/xml");
    let draws: NodeListOf<Element> = dom.documentElement.getElementsByTagName('item');
    if (draws) {
      for (let i = 0, l = draws.length; i < l; i++) {
        let item = draws.item(i);

        let draw = new Draw();
        draw.title = DrawParser.clearCDATA(item.getElementsByTagName('title').item(0).innerHTML);
        draw.link = DrawParser.clearCDATA(item.getElementsByTagName('link').item(0).innerHTML);
        draw.guid = DrawParser.clearCDATA(item.getElementsByTagName('guid').item(0).innerHTML);
        draw.description = DrawParser.clearCDATA(item.getElementsByTagName('description').item(0).innerHTML);
        draw.pubDate = new Date(item.getElementsByTagName('pubDate').item(0).innerHTML);
        draw.numbers = DrawParser.extractNumbers(draw.description);
        draw.jackpots = DrawParser.extractJackpots(draw.description);
        if (draw.jackpots.current === 0 && drawItems[drawItems.length - 1]) {
          draw.jackpots.current = drawItems[drawItems.length - 1].jackpots.next;
        }
        draw.type = (draw.guid.indexOf('euromillions') > 0) ? 'euromillions' : 'loto';
        draw.stars = (draw.type === 'euromillions') ? DrawParser.extractStars(draw.description) : DrawParser.extractLuckyNumber(draw.description);

        // en fonction du type filtré, ajout ou passe
        if (type === 'all' || type == draw.type) {
          drawItems.push(draw);
        }
      }
    }
    return drawItems;
  }

  /**
   * Supprime la balise <![CDATA[
   * @param description le champ 'description' de l'item RSS
   * @returns {string}
   */
  private static clearCDATA(description: string): string {
    return description.replace("<![CDATA[", "").replace("]]>", "");
  }

  /**
   * Extrait les 5 numéros de la grille
   * @param description le champ 'description' de l'item
   * @returns {number[]}
   */
  private static extractNumbers(description: string): number[] {
    let numbers: number[] = [];

    let numberDraws: string[] = description.match(/Numéros : ([0-9 -]+)/mi);
    if (numberDraws && numberDraws.length > 0) {
      for (let ball of numberDraws[1].match(/([0-9]+)/gmi)) {
        numbers.push(parseInt(ball, 10));
      }
    }
    return numbers;
  }

  /**
   * Extrait les étoiles de la grille (euromillions uniquement)
   * @param description le champ 'description' de l'item
   * @returns {number[]}
   */
  private static extractStars(description: string): number[] {
    let stars: number[] = [];

    let numberDraws: string[] = description.match(/Etoiles : ([0-9 -]+)/mi);
    if (numberDraws && numberDraws.length > 0) {
      for (let ball of numberDraws[1].match(/([0-9]+)/gmi)) {
        stars.push(parseInt(ball));
      }
    }
    return stars;
  }

  /**
   * Extrait le(s) numéro(s) chance(s) de la grille (loto uniquement)
   * @param description le champ 'description' de l'item
   * @returns {number[]}
   */
  private static extractLuckyNumber(description: string): number[] {
    let numbers: number[] = [];
    let numberDraws: string[] = description.match(/Chance : ([0-9 -]+)/mi);
    if (numberDraws && numberDraws.length > 0) {
      for (let ball of numberDraws[1].match(/([0-9]+)/gmi)) {
        numbers.push(parseInt(ball));
      }
    }
    return numbers;
  }

  /**
   * Extrait le montant du jackpot du gagnant, le montant du jackpot courant (si gagnant) et le montant du prochain jackpot
   * @param description le champ 'description' de l'item
   * @returns {{current: number, win: number, next: number}}
   */
  private static extractJackpots(description: string): {current: number, win: number, next: number} {
    let jackpots: {current: number, win: number, next: number} = {current: 0, win: 0, next: 0};

    let values = description.match(/<strong>([0-9 ]+)?/g);

    if (values) {
      if (values.length === 2) {
        jackpots.current = parseInt(values[0].replace(/(<strong>| )/g, ''));
        jackpots.win = jackpots.current;
        jackpots.next = parseInt(values[1].replace(/(<strong>| )/g, ''));

      } else {
        jackpots.next = parseInt(values[0].replace(/(<strong>| )/g, ''));
      }
    }
    return jackpots;
  }
}
