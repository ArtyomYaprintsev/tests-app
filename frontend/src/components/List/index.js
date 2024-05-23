import PropTypes from "prop-types";
import { List } from "./List";

List.propTypes = {
  data: PropTypes.array,
  listClassName: PropTypes.string,
  styles: PropTypes.object,

  renderItem: PropTypes.func.isRequired,
  emptyListMessage: PropTypes.string,

  listItemKey: PropTypes.string,
};

export default List;
