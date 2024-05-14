export interface ConfigurationItem {
    id: number,
    name: string,
    code: string,
    price: number | string;
    namePrice: string,
    imgUrl?: string,
    imgUrls?: string[],
    oilTankCooler?: ConfigurationItem,
    disabledOption?: boolean,
    description?: string,
    area?: string,
    mass?: string
}