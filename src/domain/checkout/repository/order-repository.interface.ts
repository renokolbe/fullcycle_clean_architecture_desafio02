import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface OrderRepositoyInterface 
    extends RepositoryInterface<Order>{}
