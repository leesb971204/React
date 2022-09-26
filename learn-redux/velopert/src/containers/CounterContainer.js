import React from "react";
import { useSelector, useDispatch, shallowEqual, connect } from "react-redux";
import { bindActionCreators } from "redux";
import Counter from "../components/Counter";
import { increase, decerase, setDiff } from "../modules/counter";

const CounterContainer = ({
  number,
  diff,
  onIncrease,
  onDecrease,
  onSetDiff,
}) => {
  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    ></Counter>
  );
};

const mapStateToProps = (state) => ({
  number: state.counter.number,
  diff: state.counter.diff,
});

const mapDispatchToProps = (dispatch) => {
  bindActionCreators(
    {
      increase,
      decerase,
      setDiff,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
