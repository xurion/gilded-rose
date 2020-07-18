export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        //loop over every item to asses/update quality
        for (let i = 0; i < this.items.length; i++) {
            //everything except affinage cheese and backstage passes
            if (
                this.items[i].name != 'Aged Brie' &&
                this.items[i].name !=
                    'Backstage passes to a TAFKAL80ETC concert'
            ) {
                //if the item is still worth something
                if (this.items[i].quality > 0) {
                    //ignore the beautiful legendary items
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        // reduce the quality by 1
                        this.items[i].quality = this.items[i].quality - 1;
                    }
                }
                // Affinage cheese or a backstage pass
            } else {
                //if the quality is already half
                if (this.items[i].quality < 50) {
                    //increase quality by 1
                    this.items[i].quality = this.items[i].quality + 1;
                    if (
                        this.items[i].name ==
                        'Backstage passes to a TAFKAL80ETC concert'
                    ) {
                        //if the no of days left to sell is 10 or lower
                        if (this.items[i].sellIn < 11) {
                            //if the quality is already half... duplicate check here
                            if (this.items[i].quality < 50) {
                                //increase quality by 1
                                this.items[i].quality =
                                    this.items[i].quality + 1;
                            }
                        }
                        //there's only 5 or less days left to sell
                        if (this.items[i].sellIn < 6) {
                            //another duplicate condition
                            if (this.items[i].quality < 50) {
                                //increase quality by 1 - looks like this condition could be removed and just rely on < 11 condition above. As long as tests exist
                                this.items[i].quality =
                                    this.items[i].quality + 1;
                            }
                        }
                    }
                }
            }

            //if not legendary
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                //reduce sellIn by 1
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }

            //days left to sell is passed
            if (this.items[i].sellIn < 0) {
                //not affinage cheese
                if (this.items[i].name != 'Aged Brie') {
                    //also not backstage pass
                    if (
                        this.items[i].name !=
                        'Backstage passes to a TAFKAL80ETC concert'
                    ) {
                        //these ifs tho
                        if (this.items[i].quality > 0) {
                            //srsly
                            if (
                                this.items[i].name !=
                                'Sulfuras, Hand of Ragnaros'
                            ) {
                                //nice, a conclusion
                                this.items[i].quality =
                                    this.items[i].quality - 1;
                            }
                        }
                        //backstage pass that has expired
                    } else {
                        //sets quality to 0, but why not explicitly set it to just 0?
                        this.items[i].quality =
                            this.items[i].quality - this.items[i].quality;
                    }
                    //affinage cheese!
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1;
                    }
                }
            }
        }

        return this.items;
    }
}
