import { round, evaluate } from 'mathjs'
import { useEffect, useState} from "react";
import {Grid, Icon, Label} from "semantic-ui-react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import CurrencyInput from "react-currency-input-field";

interface Props{
    initPrice: number | null
}
const ProfitCalculator = ({initPrice}: Props) => {
    const {requestStore} = useStore();
    const [value, setValue] = useState<string>(initPrice?.toString() || '');
    const [profit, setProfit] = useState<number>(0);
    const [newPrice, setNewPrice] = useState<number>(0);
    
    useEffect(() => {
        const price = parseFloat(value) || 0
        
        const {coefficient, originalPrice} = requestStore.request;

        let clearPrice: number = evaluate(`${originalPrice} * (1 - ${coefficient} / 100)`);
        clearPrice = round<number>(clearPrice, 2);
        const priceRemoveAmountWhenNoDiscount: number = evaluate(`${price}*0.87`);
        const priceWithNoCommission = evaluate(`${priceRemoveAmountWhenNoDiscount} * 0.805 - 5`);
        let newProfit = evaluate(`${priceWithNoCommission} - ${clearPrice}`);
        newProfit = round<number>(newProfit, 2);

        const newPriceAfterDiscount = round<number>(evaluate(`${price} * 0.87`),2)
        setNewPrice(newPriceAfterDiscount);
        setProfit(newProfit);
    }, [value])
    
    const onChange = (value: string | undefined) => {
        if (!value) {
            setValue('');
            return;
        }
        if (Number.isNaN(Number(value))) {
            return;
        }
        setValue(value);
    }
    
    return (
        <>
            <Grid.Row>
                <Grid.Column width={12}>
                    <div className='ui input'>
                        <CurrencyInput
                            name="newPrice"
                            value={value}
                            onValueChange={onChange}
                            placeholder="Please enter a Price"
                            prefix={'$'}
                            step={1}
                        />
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Label color={profit > 0 ? 'teal' : 'red'}>
                        <Icon name={profit > 0 ? 'arrow alternate circle up' : 'arrow alternate circle down'}/> New Profit $ {profit}
                    </Label>
                    <Label color={'orange'}>
                        <Icon name='money'/> New Price $ {newPrice}
                    </Label>
                </Grid.Column>
            </Grid.Row>

        </>
    );
}

export default observer(ProfitCalculator);