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

    constructor(items: Item[]) {
        this.items = items;
    }

    updateQuality() {
        //loop over every item to asses/update quality
        this.items.forEach((item) => {
            // Affinage cheese or a backstage pass
            if (
                item.name === 'Aged Brie' ||
                item.name === 'Backstage passes to a TAFKAL80ETC concert'
            ) {
                //if the quality is less than the standard item maximum (ignores 50+ quality legendary items?)
                if (item.quality < 50) {
                    //increase quality by 1
                    item.quality = item.quality + 1;
                    if (
                        item.name == 'Backstage passes to a TAFKAL80ETC concert'
                    ) {
                        //if the no of days left to sell is 10 or lower
                        if (item.sellIn < 11) {
                            //increase quality by 1
                            item.quality = item.quality + 1;
                        }
                        //there's only 5 or less days left to sell
                        if (item.sellIn < 6) {
                            //increase quality by 1
                            item.quality = item.quality + 1;
                        }
                        item.quality = item.quality > 50 ? 50 : item.quality;
                    }
                }
                //everything except affinage cheese and backstage passes
            } else {
                //if the item is still worth something
                if (item.quality > 0) {
                    //ignore the beautiful legendary items
                    if (item.name != 'Sulfuras, Hand of Ragnaros') {
                        // reduce the quality by 1
                        item.quality = item.quality - 1;
                    }
                }
            }

            //if not legendary
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                //reduce sellIn by 1
                item.sellIn = item.sellIn - 1;
            }

            //days left to sell is passed
            if (item.sellIn < 0) {
                //not affinage cheese
                if (item.name != 'Aged Brie') {
                    //also not backstage pass
                    if (
                        item.name != 'Backstage passes to a TAFKAL80ETC concert'
                    ) {
                        //these ifs tho
                        if (item.quality > 0) {
                            //srsly
                            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                                //nice, a conclusion
                                item.quality = item.quality - 1;
                            }
                        }
                        //backstage pass that has expired
                    } else {
                        //sets quality to 0, but why not explicitly set it to just 0?
                        item.quality = item.quality - item.quality;
                    }
                    //affinage cheese!
                } else {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1;
                    }
                }
            }
        });

        return this.items;
    }
}
