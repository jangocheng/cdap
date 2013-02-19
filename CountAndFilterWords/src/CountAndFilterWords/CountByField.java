package CountAndFilterWords;

import com.continuuity.api.data.OperationException;
import com.continuuity.api.data.dataset.KeyValueTable;
import com.continuuity.api.flow.flowlet.ComputeFlowlet;
import com.continuuity.api.flow.flowlet.FlowletSpecifier;
import com.continuuity.api.flow.flowlet.OutputCollector;
import com.continuuity.api.flow.flowlet.Tuple;
import com.continuuity.api.flow.flowlet.TupleContext;
import com.continuuity.api.flow.flowlet.TupleSchema;
import com.continuuity.api.flow.flowlet.builders.TupleSchemaBuilder;

public class CountByField extends ComputeFlowlet
{
  @Override
  public void configure(FlowletSpecifier configurator) {
    TupleSchema in = new TupleSchemaBuilder().
        add("field", String.class).
        add("word", String.class).
        create();

    configurator.getDefaultFlowletInput().setSchema(in);
  }

  KeyValueTable counters;

  @Override
  public void initialize() {
    super.initialize();
    this.counters = getFlowletContext().getDataSet(Common.counterTableName);
  }

  @Override
  public void process(Tuple tuple, TupleContext tupleContext, OutputCollector outputCollector) {
    if (Common.debug) {
      System.out.println(this.getClass().getSimpleName() + ": Received tuple " + tuple);
    }

    String token = tuple.get("word");
    if (token == null) return;
    String field = tuple.get("field");
    if (field != null) token = field + ":" + token;

    if (Common.debug) {
      System.out.println(this.getClass().getSimpleName() + ": Incrementing for " + token);
    }
    try {
      this.counters.increment(token.getBytes(), 1L);
    } catch (OperationException e) {
      throw new RuntimeException(e);
    }
  }
}
